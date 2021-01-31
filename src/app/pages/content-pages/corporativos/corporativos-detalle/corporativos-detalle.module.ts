import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CorporativosDetalleRoutingModule } from "./corporativos-detalle-routing.module";
import { CorporativosDetalleComponent } from "./corporativos-detalle.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AgmCoreModule } from "@agm/core";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

@NgModule({
    imports: [
        CommonModule,
        CorporativosDetalleRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        AgmCoreModule,
        NgxDatatableModule,
    ],
    exports: [CorporativosDetalleComponent],
    declarations: [CorporativosDetalleComponent],
    providers: [DatePipe],
})
export class CorporativosDetalleModule {}
