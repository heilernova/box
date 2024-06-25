import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterViewInit, Component, ElementRef, Inject, Input, Optional, Self, signal } from '@angular/core';
import { AbstractControlDirective, ControlValueAccessor, FormsModule, NgControl, Validators } from '@angular/forms';
import { MAT_FORM_FIELD, MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { Subject, last } from 'rxjs';
import { MatInputNumber } from '../mat-input-number';
import { IMaskModule } from 'angular-imask';

let nextId = 0;

@Component({
  selector: 'mat-input-cellphone',
  standalone: true,
  imports: [
    IMaskModule,
    FormsModule
  ],
  templateUrl: './mat-input-cellphone.component.html',
  styleUrl: './mat-input-cellphone.component.scss',
  providers: [
    { provide: MatFormFieldControl, useExisting: MatInputCellphone }
  ],
  host: {
    '[class.mat-input-cellphone-floating]': 'shouldLabelFloat',
    '[id]': 'id',
  }
})
export class MatInputCellphone  implements MatFormFieldControl<string | null>, ControlValueAccessor, AfterViewInit  {
  
  private _value!: string | null;

  stateChanges = new Subject<void>();
  id: string = `mat-input-cellphone-${nextId++}`;
  private _placeholder!: string;
  ngControl: NgControl | AbstractControlDirective | null = null;
  focused: boolean = false;
  touched = false;
  empty: boolean = true;
  // shouldLabelFloat: boolean = false;
  private _required: boolean = false;
  private _disabled: boolean = false;
  private _readOnly = false;

  // errorState: boolean = false;
  controlType?: string | undefined;
  autofilled?: boolean | undefined;
  userAriaDescribedBy?: string | undefined;
  disableAutomaticLabeling?: boolean | undefined;
  onChange = (_: any) => {};
  onTouched = () => {};

  get errorState(): boolean {
    let touched =  this.ngControl?.touched;

    if (touched){
      let errors = this.ngControl?.errors;
      let er = (this.ngControl?.control?.invalid || errors) ? true : false;
   
      this.stateChanges.next();
      return er;
    } else {
      return false;
    }
  }

  public customStyle = signal<{ [p: string]: string}>({});
  public maxLength = signal<number>(13);
  public mask = {
    mask: '+{7}(000)000-00-00',
    lazy: false,  // make placeholder always visible
    placeholderChar: '#'     // defaults to '_'
  }

  private _htmlInput!: HTMLInputElement;

  constructor(
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() ngControl: NgControl
  ){
    if (ngControl){
      ngControl.valueAccessor = this;
      this.ngControl = ngControl;
    }
  }

  ngOnInit(): void {
    if ( this.ngControl ){
      this._required = this.ngControl.control?.hasValidator(Validators.required) || false;
    }
  }

  ngAfterViewInit(): void {
    this._htmlInput = this._elementRef.nativeElement.querySelector('input') as HTMLInputElement;
  }
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }
  getLabelId(){
    return this._formField ? this._formField.getLabelId() : null;
  }

  @Input()
  get value(){
    return this._value;
  }

  set value(value: string | null){
    this._value = value;
    this.onChange(`+57 ${value}`);
  }

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    (this.stateChanges as any).next();
  }

  @Input()
  set align(value: 'center' | 'right' | 'left'){
    this.customStyle.set({
      'text-align': value
    })
  }

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  @Input()
  get readOnly(): boolean {
    return this._readOnly;
  }
  set readOnly(value: BooleanInput) {
    this._readOnly = coerceBooleanProperty(value);
    this.readOnlyChange.set(this._readOnly);
    this.stateChanges.next();
  }

  public readonly readOnlyChange = signal<boolean>(false);

  private _inputValue: string = ''
  set inputValue(value: string){
    let temp: string = value;
    this.value = temp;
    this.empty = value.length == 0;
    this._inputValue = value;
  }
  get inputValue(){
    return this._inputValue;
  }

  ngOnDestroy() {
    this.stateChanges.complete();
  }

  writeValue(obj: string | null): void {
    this._inputValue = obj?.substring(3) ?? '';
    this.value = obj?.substring(3) ?? '';
  }
  
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  
  setDescribedByIds(ids: string[]): void {
     const controlElement = this._elementRef.nativeElement.querySelector(
      'input',
    )!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }
  
  onContainerClick(event: MouseEvent): void {
    this._focusMonitor.focusVia(this._htmlInput, 'program');
  }

  onFocusIn(event: FocusEvent) {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }

  onFocusOut(event: FocusEvent) {
    if (!this._elementRef.nativeElement.contains(event.relatedTarget as Element)) {
      this.touched = true;
      this.focused = false;
      this.onTouched();
      this.stateChanges.next();
    }
  }


}
