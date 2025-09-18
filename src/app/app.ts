import { Component, signal, computed } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected title = 'stepper-reactive-signal-form';

  // Signals for form state management
  private currentStep = signal(0);
  private submitting = signal(false);
  private submitted = signal(false);

  // Form groups for each step
  personalInfoForm: FormGroup;
  contactInfoForm: FormGroup;
  professionalInfoForm: FormGroup;
  preferencesForm: FormGroup;
  reviewForm: FormGroup;

  // Computed signals for validation states
  isStep1Valid = signal(false);
  isStep2Valid = signal(false);
  isStep3Valid = signal(false);
  isStep4Valid = signal(false);
  isStep5Valid = signal(false);

  
  
  isSubmitting = computed(() => this.submitting());
  isSubmitted = computed(() => this.submitted());

  constructor(private fb: FormBuilder) {
    this.personalInfoForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      dateOfBirth: ['', Validators.required]
    });

    this.contactInfoForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s\-\(\)]+$/)]],
      address: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.professionalInfoForm = this.fb.group({
      company: ['', Validators.required],
      jobTitle: ['', Validators.required],
      experienceLevel: ['', Validators.required],
      skills: this.fb.array([this.createSkillFormGroup()]), // FormArray for skills
      workExperience: this.fb.array([this.createWorkExperienceFormGroup()]) // FormArray for work experience
    });

    this.preferencesForm = this.fb.group({
      preferredContact: ['', Validators.required],
      newsletter: [false],
      promotions: [false],
      comments: ['']
    });

    this.reviewForm = this.fb.group({
      termsAccepted: [false, Validators.requiredTrue]
    });

  // also set initial values once
  this.isStep1Valid.set(this.personalInfoForm.valid);
  this.isStep2Valid.set(this.contactInfoForm.valid);
  this.isStep3Valid.set(this.professionalInfoForm.valid);
  this.isStep4Valid.set(this.preferencesForm.valid);
  this.isStep5Valid.set(this.reviewForm.valid);

  // Connect forms to signals
  this.personalInfoForm.statusChanges.subscribe(() =>
    this.isStep1Valid.set(this.personalInfoForm.valid)
  );
  this.contactInfoForm.statusChanges.subscribe(() =>
    this.isStep2Valid.set(this.contactInfoForm.valid)
  );
  this.professionalInfoForm.statusChanges.subscribe(() =>
    this.isStep3Valid.set(this.professionalInfoForm.valid)
  );
  this.preferencesForm.statusChanges.subscribe(() =>
    this.isStep4Valid.set(this.preferencesForm.valid)
  );
  this.reviewForm.statusChanges.subscribe(() =>
    this.isStep5Valid.set(this.reviewForm.valid)
  );
  }

  

  

  getFormValue(formName: string, fieldName: string): any {
    const forms: { [key: string]: FormGroup } = {
      personalInfo: this.personalInfoForm,
      contactInfo: this.contactInfoForm,
      professionalInfo: this.professionalInfoForm,
      preferences: this.preferencesForm
    };

    return forms[formName]?.get(fieldName)?.value || '';
  }

    // Getters for FormArrays
  get skillsArray(): FormArray {
    return this.professionalInfoForm.get('skills') as FormArray;
  }

  get workExperienceArray(): FormArray {
    return this.professionalInfoForm.get('workExperience') as FormArray;
  }


  async submitForm(): Promise<void> {
    if (!this.isStep5Valid()) {
      return;
    }

    this.submitting.set(true);

    try {
      const formData = {
        personalInfo: this.personalInfoForm.value,
        contactInfo: this.contactInfoForm.value,
        professionalInfo: this.professionalInfoForm.value,
        preferences: this.preferencesForm.value,
        review: this.reviewForm.value,
        submittedAt: new Date().toISOString()
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      this.submitted.set(true);
      console.log('Form submitted successfully:', formData);
      
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      this.submitting.set(false);
    }
  }


  // FormArray helper methods
  createSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      level: ['', Validators.required],
      years: [0, [Validators.required, Validators.min(0)]]
    });
  }

  createWorkExperienceFormGroup(): FormGroup {
    const group = this.fb.group({
      companyName: ['', Validators.required],
      position: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [{ value: '', disabled: false }],
      isCurrentJob: [false],
      description: ['']
    });

    // Automatically disable/enable endDate when isCurrentJob changes
    group.get('isCurrentJob')?.valueChanges.subscribe((isCurrent) => {
      const endDateControl = group.get('endDate');
      if (isCurrent) {
        endDateControl?.disable({ emitEvent: false });
      } else {
        endDateControl?.enable({ emitEvent: false });
      }
    });
    return group;
  }

  addSkill(): void {
    this.skillsArray.push(this.createSkillFormGroup());
  }

  removeSkill(index: number): void {
    if (this.skillsArray.length > 1) {
      this.skillsArray.removeAt(index);
    }
  }

  addWorkExperience(): void {
    this.workExperienceArray.push(this.createWorkExperienceFormGroup());
  }

  removeWorkExperience(index: number): void {
    if (this.workExperienceArray.length > 1) {
      this.workExperienceArray.removeAt(index);
    }
  }
}
