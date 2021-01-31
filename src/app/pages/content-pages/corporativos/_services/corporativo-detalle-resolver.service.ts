import { Injectable } from "@angular/core";
import { CorporativosService } from "./corporativos.service";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";

@Injectable({ providedIn: "root" })
export class CorporativoDetalleResolver implements Resolve<any> {
    constructor(private corporativosService: CorporativosService) {}

    resolve(route: ActivatedRouteSnapshot) {
        const idCorporativo = route.paramMap.get("id");
        return this.corporativosService.getCorporativo(idCorporativo);
    }
}
