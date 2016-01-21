/**
 *   FPempresa
 *   Copyright (C) 2014  Lorenzo González
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU Affero General Public License as
 *   published by the Free Software Foundation, either version 3 of the
 *   License, or (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU Affero General Public License for more details.
 *
 *   You should have received a copy of the GNU Affero General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package es.logongas.fpempresa.modelo.titulado;

import es.logongas.fpempresa.modelo.comun.geo.Direccion;
import es.logongas.fpempresa.modelo.comun.usuario.Usuario;
import es.logongas.fpempresa.modelo.titulado.configuracion.Configuracion;
import es.logongas.ix3.core.annotations.Label;
import es.logongas.ix3.rule.ActionRule;
import es.logongas.ix3.rule.RuleGroupPredefined;
import java.util.Date;
import java.util.Set;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import org.hibernate.validator.constraints.NotEmpty;

/**
 *
 * @author Lorenzo
 */
public class Titulado {
    private int idTitulado;
    
    @NotNull
    @Past
    @Label("Fecha de nacimiento")
    private Date fechaNacimiento;
    
    @NotNull
    @Valid
    private Direccion direccion;
    
    @Pattern(regexp = "[0-9]{9}| {0}")
    private String telefono;
    
    @Pattern( regexp = "[0-9]{9}| {0}")
    @Label("Telefono alternativo")
    private String telefonoAlternativo;
    
    @NotNull
    @Label("Tipo de documento")
    private TipoDocumento tipoDocumento;
    
    @NotEmpty
    @Label("Nº de documento")
    @Size(max=20)
    private String numeroDocumento;
    
    private Set<TituloIdioma> titulosIdiomas;
    private Set<ExperienciaLaboral> experienciasLaborales;
    private Set<FormacionAcademica> formacionesAcademicas;

    @Valid
    @NotNull
    private Configuracion configuracion=new Configuracion();
    
    @Label("Sobre mi")
    @Size(max=255)
    private String resumen;
    
    @Label("Otras competencias")
    @Size(max=65000)     
    private String otrasCompetencias;
    
    @Label("Permisos de conducir")
    @Size(max=255)
    private String permisosConducir;
    
    @ActionRule(groups = RuleGroupPredefined.PreInsert.class)
    private void provinciaDeNotificacionIgualALaDireccion() {
        if (configuracion.getNotificacionOferta().getProvincias().isEmpty()) {
            configuracion.getNotificacionOferta().getProvincias().add(direccion.getMunicipio().getProvincia());
            configuracion.getNotificacionOferta().setNotificarPorEmail(true);
        }
    }
    
    
    public Titulado() {
    }
    
    /**
     * @return the idTitulado
     */
    public int getIdTitulado() {
        return idTitulado;
    }

    /**
     * @param idTitulado the idTitulado to set
     */
    public void setIdTitulado(int idTitulado) {
        this.idTitulado = idTitulado;
    }

    /**
     * @return the fechaNacimiento
     */
    public Date getFechaNacimiento() {
        return fechaNacimiento;
    }

    /**
     * @param fechaNacimiento the fechaNacimiento to set
     */
    public void setFechaNacimiento(Date fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    /**
     * @return the direccion
     */
    public Direccion getDireccion() {
        return direccion;
    }

    /**
     * @param direccion the direccion to set
     */
    public void setDireccion(Direccion direccion) {
        this.direccion = direccion;
    }

    /**
     * @return the telefono
     */
    public String getTelefono() {
        return telefono;
    }

    /**
     * @param telefono the telefono to set
     */
    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    /**
     * @return the telefonoAlternativo
     */
    public String getTelefonoAlternativo() {
        return telefonoAlternativo;
    }

    /**
     * @param telefonoAlternativo the telefonoAlternativo to set
     */
    public void setTelefonoAlternativo(String telefonoAlternativo) {
        this.telefonoAlternativo = telefonoAlternativo;
    }

    /**
     * @return the tipoDocumento
     */
    public TipoDocumento getTipoDocumento() {
        return tipoDocumento;
    }

    /**
     * @param tipoDocumento the tipoDocumento to set
     */
    public void setTipoDocumento(TipoDocumento tipoDocumento) {
        this.tipoDocumento = tipoDocumento;
    }

    /**
     * @return the numeroDocumento
     */
    public String getNumeroDocumento() {
        return numeroDocumento;
    }

    /**
     * @param numeroDocumento the numeroDocumento to set
     */
    public void setNumeroDocumento(String numeroDocumento) {
        this.numeroDocumento = numeroDocumento;
    }

    /**
     * @return the titulosIdioma
     */
    public Set<TituloIdioma> getTitulosIdiomas() {
        return titulosIdiomas;
    }

    /**
     * @param titulosIdiomas the titulosIdioma to set
     */
    public void setTitulosIdiomas(Set<TituloIdioma> titulosIdiomas) {
        this.titulosIdiomas = titulosIdiomas;
    }

    /**
     * @return the experienciasLaborales
     */
    public Set<ExperienciaLaboral> getExperienciasLaborales() {
        return experienciasLaborales;
    }

    /**
     * @param experienciasLaborales the experienciasLaborales to set
     */
    public void setExperienciasLaborales(Set<ExperienciaLaboral> experienciasLaborales) {
        this.experienciasLaborales = experienciasLaborales;
    }

    /**
     * @return the formacionesAcademicas
     */
    public Set<FormacionAcademica> getFormacionesAcademicas() {
        return formacionesAcademicas;
    }

    /**
     * @param formacionesAcademicas the formacionesAcademicas to set
     */
    public void setFormacionesAcademicas(Set<FormacionAcademica> formacionesAcademicas) {
        this.formacionesAcademicas = formacionesAcademicas;
    }

    /**
     * @return the configuracion
     */
    public Configuracion getConfiguracion() {
        return configuracion;
    }

    /**
     * @param configuracion the configuracion to set
     */
    public void setConfiguracion(Configuracion configuracion) {
        this.configuracion = configuracion;
    }

    /**
     * @return the resumen
     */
    public String getResumen() {
        return resumen;
    }

    /**
     * @param resumen the resumen to set
     */
    public void setResumen(String resumen) {
        this.resumen = resumen;
    }

    /**
     * @return the otrasCompetencias
     */
    public String getOtrasCompetencias() {
        return otrasCompetencias;
    }

    /**
     * @param otrasCompetencias the otrasCompetencias to set
     */
    public void setOtrasCompetencias(String otrasCompetencias) {
        this.otrasCompetencias = otrasCompetencias;
    }

    /**
     * @return the permisosConducir
     */
    public String getPermisosConducir() {
        return permisosConducir;
    }

    /**
     * @param permisosConducir the permisosConducir to set
     */
    public void setPermisosConducir(String permisosConducir) {
        this.permisosConducir = permisosConducir;
    }

}
