import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'module-climatologic-products',
    templateUrl: './climatologic-products.component.html',
    styleUrls: ['./climatologic-products.component.css'],
})
export class ClimatologicProductsComponent implements OnInit {

    @Input() data: any;
    @Output() onItemSeleccionado = new EventEmitter<{}>();

    constructor() {
    }

    ngOnInit() {
        // console.log(this.data);
    }
}