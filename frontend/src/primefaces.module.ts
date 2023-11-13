import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { ContextMenuModule } from 'primeng/contextmenu';
import { PickListModule } from 'primeng/picklist';
import { TabViewModule } from 'primeng/tabview';
import { CarouselModule } from 'primeng/carousel';
import { FieldsetModule } from 'primeng/fieldset';
import { ChartModule } from 'primeng/chart';
import { MessagesModule } from 'primeng/messages';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { PanelModule } from 'primeng/panel';
import { ToolbarModule } from 'primeng/toolbar';
import { SpeedDialModule } from 'primeng/speeddial';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  imports: [
    SkeletonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule,
    AutoCompleteModule,
    ButtonModule,
    CalendarModule,
    InputTextModule,
    InputTextareaModule,
    InputMaskModule,
    InputNumberModule,
    SplitButtonModule,
    MenubarModule,
    MenuModule,
    ContextMenuModule,
    PickListModule,
    TabViewModule,
    CarouselModule,
    FieldsetModule,
    ChartModule,
    MessagesModule,
    FileUploadModule,
    ProgressBarModule,
    SliderModule,
    RatingModule,
    PanelModule,
    ToolbarModule,
    SpeedDialModule,
    DialogModule,
    DynamicDialogModule,
  ],
  exports: [
    SkeletonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule,
    AutoCompleteModule,
    ButtonModule,
    CalendarModule,
    InputTextModule,
    InputTextareaModule,
    InputMaskModule,
    InputNumberModule,
    SplitButtonModule,
    MenubarModule,
    MenuModule,
    ContextMenuModule,
    PickListModule,
    TabViewModule,
    CarouselModule,
    FieldsetModule,
    ChartModule,
    MessagesModule,
    FileUploadModule,
    ProgressBarModule,
    SliderModule,
    RatingModule,
    PanelModule,
    ToolbarModule,
    SpeedDialModule,
    DialogModule,
    DynamicDialogModule,
  ],
  providers: [
    DialogService,
    MessageService,
    DynamicDialogRef,
  ],
})
export class PrimeFacesModule {}
