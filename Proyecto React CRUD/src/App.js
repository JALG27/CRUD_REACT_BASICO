import logo from './logo.svg';
import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';

const data = [
  { id: 1, Nombre: "Antonio", Apellido: "Gonzalez", Cedula: "27.030.264", Sexo: "Masculino"},
  { id: 2, Nombre: "Jose", Apellido: "Perez", Cedula: "26.463.032", Sexo: "Masculino"},
  { id: 3, Nombre: "Ana", Apellido: "Urdaneta", Cedula: "27.542.436", Sexo: "Femenino"},
  { id: 4, Nombre: "Luis", Apellido: "Hernandez", Cedula: "25.678.157", Sexo: "Masculino"},
  { id: 5, Nombre: "Paola", Apellido: "Gomez", Cedula: "26.036.731", Sexo: "Femenino"},
];

class App extends React.Component{
  state={
    data: data,
    form:{
      id:" ",
      Nombre:" ",
      Apellido:" ",
      Cedula:" ",
      Sexo:" ",
    },
    modalInsertar:false,
    modalEditar:false,
  };

  handleChange=e=>{
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });

  }

  mostrarModalInsertar=()=>{
    this.setState({modalInsertar: true});
  }

  ocultarModalInsertar=()=>{
    this.setState({modalInsertar: false});
  }

  mostrarModalEditar=(registro)=>{
    this.setState({modalEditar: true, form: registro});
  }

  ocultarModalEditar=()=>{
    this.setState({modalEditar: false});
  }


  Insertar=()=>{
  var valorNuevo={...this.state.form};
  valorNuevo.id=this.state.data.length+1;
  var lista=this.state.data;
  lista.push(valorNuevo);
  this.setState({data: lista, modalInsertar: false});
}

editar=(dato)=>{
  var contador=0;
  var lista=this.state.data;
  lista.map((registro)=>{
   if(dato.id==registro.id){
     lista[contador].Nombre=dato.Nombre;
     lista[contador].Apellido=dato.Apellido;
     lista[contador].Cedula=dato.Cedula;
     lista[contador].Sexo=dato.Sexo;
   }
   contador++;
  });
  this.setState ({data: lista, modalEditar: false});
}

eliminar=(dato)=>{
  var opcion=window.confirm("Realmente desea eliminar el registro "+dato.id);
  if (opcion){
    var contador=0;
    var lista = this.state.data;
    lista.map((registro)=>{
      if(registro.id==dato.id){
      lista.splice(contador, 1);
      }
      contador++;
    });
    this.setState({data: lista});
  }
}

  render(){
    return(
      <>
      <Container>
      <br />
      <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Insertar Nueva Persona</Button>
      <br /><br />

      <Table>
      <thead><tr><th>id</th>
      <th>Nombre</th>
      <th>Apellido</th>
      <th>Cedula</th>
      <th>Sexo</th></tr></thead>
      <tbody>
        {this.state.data.map((elemento)=> (
          <tr>
            <td>{elemento.id}</td>
            <td>{elemento.Nombre}</td>
            <td>{elemento.Apellido}</td>
            <td>{elemento.Cedula}</td>
            <td>{elemento.Sexo}</td>
            <td><Button color="primary" onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button> {"       "}
            <Button color="danger" onClick={()=>this.eliminar(elemento)}>Eliminar</Button></td>
</tr>

        ))}

      </tbody>

      </Table>
      </Container>

      <Modal isOpen={this.state.modalInsertar}>
      <ModalHeader>
      <div>
        <h3>Insertar Registro</h3>
      </div>
      </ModalHeader>

      <ModalBody>
      <FormGroup>
      <label>id:</label>
      <input className="form-control" readOnly type="text" value={this.state.data.length+1} />
      </FormGroup>

      <FormGroup>
      <label>Nombre:</label>
      <input className="form-control" name="Nombre" type="text" onChange={this.handleChange}/>
      </FormGroup>

      <FormGroup>
      <label>Apellido:</label>
      <input className="form-control" name="Apellido" type="text" onChange={this.handleChange}/>
      </FormGroup>

      <FormGroup>
      <label>Cedula:</label>
      <input className="form-control" name="Cedula" type="text" onChange={this.handleChange}/>
      </FormGroup>

      <FormGroup>
      <label>Sexo:</label>
      <input className="form-control" name="Sexo" type="text" onChange={this.handleChange}/>
      </FormGroup>

      </ModalBody>

      <ModalFooter>
      <Button color="primary"onClick={()=>this.Insertar()}>Insertar</Button>
      <Button color="danger" onClick={()=>this.ocultarModalInsertar()}>Cancelar</Button>
      </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.modalEditar}>
      <ModalHeader>
      <div>
        <h3>Editar Registro</h3>
      </div>
      </ModalHeader>

      <ModalBody>
      <FormGroup>
      <label>id:</label>
      <input className="form-control" readOnly type="text" value={this.state.form.id}/>
      </FormGroup>

      <FormGroup>
      <label>Nombre:</label>
      <input className="form-control" name="Nombre" type="text" onChange={this.handleChange} value={this.state.form.Nombre}/>
      </FormGroup>

      <FormGroup>
      <label>Apellido:</label>
      <input className="form-control" name="Apellido" type="text" onChange={this.handleChange} value={this.state.form.Apellido}/>
      </FormGroup>

      <FormGroup>
      <label>Cedula:</label>
      <input className="form-control" name="Cedula" type="text" onChange={this.handleChange} value={this.state.form.Cedula}/>
      </FormGroup>

      <FormGroup>
      <label>Sexo:</label>
      <input className="form-control" name="Sexo" type="text" onChange={this.handleChange} value={this.state.form.Sexo}/>
      </FormGroup>

      </ModalBody>

      <ModalFooter>
      <Button color="primary"onClick={()=>this.editar(this.state.form)}>Editar</Button>
      <Button color="danger" onClick={()=>this.ocultarModalEditar()}>Cancelar</Button>
      </ModalFooter>
      </Modal>


      </>
    )
  }
}

export default App;
