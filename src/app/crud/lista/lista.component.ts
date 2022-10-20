import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { usuario } from '../interfaces/crud.interface';
import { FormularioService } from '../services/formulario.service';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  usuarios: usuario[]=[]
  constructor(private formularioService: FormularioService) { }

  @Input() usuarioInput!:usuario[]
  @Output() usu:EventEmitter<usuario>=new EventEmitter()
  ngOnInit(): void {
    this.formularioService.getUsu().subscribe(usu=>{
      this.usuarios=usu
      console.log(this.usuarios)
    })
    
  }

  actualizar(usuario:usuario){
    this.formularioService.getUsuporId(usuario).subscribe(resp=>{
      this.usu.emit(resp)
      console.log(resp.id)
    })
    
  }

  eliminar(usuario:usuario){
    this.formularioService.eliminar(usuario).subscribe(resp=>{
      this.ngOnInit()
    })
  }
}
