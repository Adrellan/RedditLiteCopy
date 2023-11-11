import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import {CardModule} from "primeng/card";
import {EditorModule} from "primeng/editor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ListboxModule} from "primeng/listbox";
import {CheckboxModule} from "primeng/checkbox";
import {TriStateCheckboxModule} from "primeng/tristatecheckbox";
import {ButtonModule} from "primeng/button";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";



@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    TriStateCheckboxModule,
    CheckboxModule,
    ListboxModule,
    ReactiveFormsModule,
    FormsModule,
    EditorModule,
    CardModule,
    ButtonModule
  ],
  exports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    TriStateCheckboxModule,
    CheckboxModule,
    ListboxModule,
    ReactiveFormsModule,
    FormsModule,
    EditorModule,
    CardModule,
    ButtonModule

  ],


})
export class MaterialModule {}
