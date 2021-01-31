import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CorporativosComponent } from "./corporativos.component";

const routes: Routes = [
    {
        path: "",
        component: CorporativosComponent,
        data: {
            title: "Corporativos",
        },
    },
    {
        path: "detalle/:id",
        loadChildren: () =>
            import("./corporativos-detalle/corporativos-detalle.module").then(
                (m) => m.CorporativosDetalleModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CorporativosRoutingModule {}
