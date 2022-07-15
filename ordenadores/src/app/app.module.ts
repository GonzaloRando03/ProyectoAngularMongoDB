import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule} from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearOrdenadorComponent } from './components/crear-ordenador/crear-ordenador.component';
import { ListarOrdenadorComponent } from './components/listar-ordenador/listar-ordenador.component';
import { ListarVentaComponent } from './components/listar-venta/listar-venta.component';
import { CrearVentaComponent } from './components/crear-venta/crear-venta.component';
import { MenuComponent } from './components/menu/menu.component';
import { QueriesComponent } from './components/queries/queries.component';
import { DescuentoComponent } from './components/queries/consultas/descuento/descuento.component';
import { SplitPipe } from './pipe/split.pipe';
import { CompradoresComponent } from './components/queries/consultas/compradores/compradores.component';
import { PrecioPcComponent } from './components/queries/consultas/precio-pc/precio-pc.component';
import { CaroBaratComponent } from './components/queries/consultas/caro-barat/caro-barat.component';
import { MarcasComponent } from './components/marcas/marcas.component';
import { LoginComponent } from './components/login/login.component';
import { VentasArticulosComponent } from './components/queries/consultas/ventas-articulos/ventas-articulos.component';
import { BooleanPipe } from './pipe/boolean.pipe';
import { MarcaVentaComponent } from './components/queries/consultas/marca-venta/marca-venta.component';

@NgModule({
  declarations: [
    AppComponent,
    CrearOrdenadorComponent,
    ListarOrdenadorComponent,
    ListarVentaComponent,
    CrearVentaComponent,
    MenuComponent,
    QueriesComponent,
    DescuentoComponent,
    SplitPipe,
    CompradoresComponent,
    PrecioPcComponent,
    CaroBaratComponent,
    MarcasComponent,
    LoginComponent,
    VentasArticulosComponent,
    BooleanPipe,
    MarcaVentaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
