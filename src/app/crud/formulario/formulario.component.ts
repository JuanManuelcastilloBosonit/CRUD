import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { usuario } from '../interfaces/crud.interface';
import { Pais } from '../interfaces/paises.interface';
import { FormularioService } from '../services/formulario.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  miFormulario: FormGroup=this.fb.group({
    nombre:['', Validators.required,],
    password:['',Validators.compose([Validators.required, Validators.minLength(6)])],
    email: ['',Validators.required],
    oferta:[false],
    pais: ['', Validators.required],
    ciudad: ['', Validators.required],
    id:['']
  })
  paises:Pais[]=[]
  usuario!:usuario
  usuarios:usuario[]=[]
  constructor(private fb: FormBuilder, private formularioService: FormularioService) { }
  ngOnInit(): void {
    console.log(this.miFormulario)
    this.formularioService.getUsu().subscribe(resp=>{
      this.usuarios=resp
    })
    this.formularioService.getpaises().subscribe(pais=>{
      this.paises=pais
    })
  }
    
  campoNoValido(campo:string){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched
  }
  guardar(){
    
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.get('id')?.value);
    if(this.miFormulario.controls["id"]?.value===''){
      this.usuario=this.miFormulario!.value;
      this.formularioService.agregarUsuario(this.usuario).subscribe(resp=>{
        this.ngOnInit()
      })
      this.miFormulario.reset()
      
      console.log(this.miFormulario.value);   
    }else{
      this.usuario=this.miFormulario!.value
      this.formularioService.actualizarUsuario(this.usuario).subscribe(resp=>{
        this.usuario=resp
        this.ngOnInit()
      })
      location.reload()
    }
    
  }
  actualizar(usuario:usuario){
    this.miFormulario.patchValue(usuario)
  }
}
