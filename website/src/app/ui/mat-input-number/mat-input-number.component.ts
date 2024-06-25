import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterViewInit, Component, ElementRef, Inject, Input, Optional, Self, signal } from '@angular/core';
import { AbstractControlDirective, ControlValueAccessor, FormsModule, NgControl, Validators } from '@angular/forms';
import { MAT_FORM_FIELD, MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { IMaskModule } from 'angular-imask';

let nextId = 0;

@Component({
  selector: 'mat-input-number',
  standalone: true,
  imports: [
    FormsModule,
    IMaskModule
  ],
  templateUrl: './mat-input-number.component.html',
  styleUrl: './mat-input-number.component.scss',
  providers: [
    { provide: MatFormFieldControl, useExisting: MatInputNumber }
  ],
  host: {
    '[class.mat-input-number-floating]': 'shouldLabelFloat',
    '[id]': 'id',
  }
})
export class MatInputNumber implements MatFormFieldControl<number>, ControlValueAccessor, AfterViewInit {
  private _value!: number | null;
  stateChanges = new Subject<void>();
  id: string = `mat-input-number-${nextId++}`;
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
    mask: Number,
    thousandsSeparator: '.',  // any single char
    radix: '.',  // fractional delimiter
    mapToRadix: [','],  // symbols to process as radix
    autofix: true,
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

  private _type: 'number' | 'percentage' = 'number';
  @Input()
  set type(value: 'number' | 'percentage'){
    this._type = value;
    if (value == 'percentage'){
      this.maxLength.set(2);
    }
  }

  @Input()
  get value(){
    return this._value;
  }

  set value(value: number | null){
    if (this._type == 'number'){
      this._value = value;
    } else {
      this._value = value != null ? (value / 100) : value;
    }
    this.stateChanges.next();
    if (value && value > 0) this.empty = false;
    this.onChange(this._value);
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
    let temp: string = value.replace(/[^0-9]/g, '');
    this.value = temp.length > 0 ? Number.parseInt(temp) : 0;
    this.empty = value.length == 0;
    this._inputValue = value;
  }
  get inputValue(){
    return this._inputValue;
  }

  ngOnDestroy() {
    this.stateChanges.complete();
  }

  writeValue(obj: number | null): void {
    let temp: string;
    if (this._type == 'number'){
      temp = obj?.toString() ?? '';
    } else {
      if (typeof obj == 'number'){
        obj = obj * 100; 

      }
      temp = obj?.toString() ?? '';
    }
    this._inputValue = temp != '0' ? temp : '';
    this.value = obj;
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
    if (this._inputValue == '0'){
      this.inputValue  = '';
    }
    if (!this._elementRef.nativeElement.contains(event.relatedTarget as Element)) {
      this.touched = true;
      this.focused = false;
      this.onTouched();
      this.stateChanges.next();
    }
  }


}
