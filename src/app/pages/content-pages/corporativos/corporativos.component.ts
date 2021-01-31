import { Component, OnInit } from "@angular/core";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { NgxSpinnerService } from "ngx-spinner";
import { map } from "rxjs/operators";
import { CorporativosService } from "./_services/corporativos.service";

@Component({
    selector: "app-corporativos",
    templateUrl: "./corporativos.component.html",
    styleUrls: ["./corporativos.component.scss"],
})
export class CorporativosComponent implements OnInit {
    public ColumnMode = ColumnMode;
    public limitRef = 10;
    public rows = [];

    constructor(
        private corporativosService: CorporativosService,
        private spinner: NgxSpinnerService,
    ) {}

    ngOnInit(): void {
        this.getTableData();
    }

    private getTableData(): void {
        this.spinner.show();
        this.corporativosService
            .getCorporativos()
            .pipe(
                map(({ data }) => {
                    return data.map((element) => {
                        const {
                            id,
                            S_NombreCorto: corto,
                            S_NombreCompleto: completo,
                            S_LogoURL: logo,
                            S_SystemUrl: url,
                            D_FechaIncorporacion: incorporacion,
                            created_at: creado,
                            user_created: { S_Nombre: creado2 },
                            asignado: { S_Nombre: asignado },
                            S_Activo: status,
                        } = element;

                        return {
                            id,
                            corto,
                            completo,
                            logo,
                            url: `https://devschoolcloud.com/sa/#/${url}`,
                            incorporacion,
                            creado,
                            creado2,
                            asignado,
                            status,
                        };
                    });
                })
            )
            .subscribe((registers: []) => {
                this.rows = registers;
                this.rows = [...this.rows];
                this.spinner.hide();
            });
    }

}
