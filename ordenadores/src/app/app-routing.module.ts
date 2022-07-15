import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { ListarOrdenadorComponent } from './components/listar-ordenador/listar-ordenador.component'
import { CrearOrdenadorComponent } from './components/crear-ordenador/crear-ordenador.component'
import { ListarVentaComponent } from './components/listar-venta/listar-venta.component'
import { CrearVentaComponent } from './components/crear-venta/crear-venta.component'
import { MenuComponent } from './components/menu/menu.component'
import { QueriesComponent } from './components/queries/queries.component'
import { DescuentoComponent } from './components/queries/consultas/descuento/descuento.component';
import { CompradoresComponent } from './components/queries/consultas/compradores/compradores.component';
import { PrecioPcComponent } from './components/queries/consultas/precio-pc/precio-pc.component';
import { CaroBaratComponent } from './components/queries/consultas/caro-barat/caro-barat.component';
import { MarcasComponent } from './components/marcas/marcas.component';
import { LoginComponent } from './components/login/login.component';
import { VentasArticulosComponent } from './components/queries/consultas/ventas-articulos/ventas-articulos.component';
import { MarcaVentaComponent } from './components/queries/consultas/marca-venta/marca-venta.component';

const routes: Routes = [
  /* router raiz */
  { path: '', component: LoginComponent },

  /* router login */
  { path: 'login', component: LoginComponent },

  /* router para ventas con artiulos y marcas */
  { path: 'ventas', component: VentasArticulosComponent },

  /* routers para ordenadores */
  { path: 'listar-ordenador', component: ListarOrdenadorComponent },
  { path: 'crear-ordenador', component: CrearOrdenadorComponent },
  { path: 'editar-ordenador/:id', component: CrearOrdenadorComponent },
  { path: 'un-ordenador/:id', component: ListarOrdenadorComponent },

  /* routers para ventas */
  { path: 'listar-venta', component: ListarVentaComponent },
  { path: 'una-venta/:id', component: ListarVentaComponent },
  { path: 'crear-venta', component: CrearVentaComponent },
  { path: 'editar-venta/:id', component: CrearVentaComponent },

  /* routar para marcas */
  { path: 'marcas', component: MarcasComponent },
  { path: 'marca/:id', component: MarcasComponent },

  /* router para el menu */
  { path: 'menu', component: MenuComponent },

  /* router para las queries */
  { path: 'queries', component: QueriesComponent },
  { path: 'descuento', component: DescuentoComponent },
  { path: 'compradores', component: CompradoresComponent },
  { path: 'precioPc', component: PrecioPcComponent },
  { path: 'caroBarato', component: CaroBaratComponent },
  { path: 'marcaVenta', component: MarcaVentaComponent },

  /* router para cualquier ruta que no este en las especificadas */
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
