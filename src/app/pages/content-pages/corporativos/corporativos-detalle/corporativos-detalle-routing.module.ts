import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CorporativoDetalleResolver } from "../_services/corporativo-detalle-resolver.service";
import { CorporativosDetalleComponent } from "./corporativos-detalle.component";

const routes: Routes = [
    {
        path: "",
        component: CorporativosDetalleComponent,
        data: {
            title: "Detalle de Corporativos",
        },
        resolve: { detalleCorporativo: CorporativoDetalleResolver },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CorporativosDetalleRoutingModule {}
