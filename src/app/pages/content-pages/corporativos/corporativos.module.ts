import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CorporativosRoutingModule } from "./corporativos-routing.module";
import { CorporativosComponent } from "./corporativos.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

@NgModule({
    imports: [
        CommonModule,
        CorporativosRoutingModule,
        NgxDatatableModule,
    ],
    exports: [CorporativosComponent],
    declarations: [CorporativosComponent],
    providers: [],
})
export class CorporativosModule {}
