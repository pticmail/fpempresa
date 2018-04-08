/**
 * FPempresa Copyright (C) 2015 Lorenzo González
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any
 * later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
package es.logongas.fpempresa.presentacion.controller;

import es.logongas.fpempresa.businessprocess.download.DownloadBusinessProcess;
import es.logongas.ix3.core.Principal;
import es.logongas.ix3.core.conversion.Conversion;
import es.logongas.ix3.dao.DataSession;
import es.logongas.ix3.dao.DataSessionFactory;
import es.logongas.ix3.service.CRUDServiceFactory;
import es.logongas.ix3.web.util.ControllerHelper;
import es.logongas.ix3.web.util.HttpResult;
import es.logongas.ix3.web.util.MimeType;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author logongas
 */
@Controller
public class DownloadController {

    private static final Log log = LogFactory.getLog(DownloadController.class);

    @Autowired
    CRUDServiceFactory crudServiceFactory;
    @Autowired
    private DownloadBusinessProcess downloadBusinessProcess;
    @Autowired
    private DataSessionFactory dataSessionFactory;
    @Autowired
    private ControllerHelper controllerHelper;
    @Autowired
    private Conversion conversion;
    
    @RequestMapping(value = {"/{path}/download/nocentro/ofertas.xls"}, method = RequestMethod.GET, produces = "application/vnd.ms-excel")
    public void getEstadisticasCentro(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {

        try (DataSession dataSession = dataSessionFactory.getDataSession()) {
            Principal principal = controllerHelper.getPrincipal(httpServletRequest, httpServletResponse, dataSession);

            Date fechaInicio = (Date) conversion.convertFromString(httpServletRequest.getParameter("fechaInicio"), Date.class);
            Date fechaFin = (Date) conversion.convertFromString(httpServletRequest.getParameter("fechaFin"), Date.class);

            byte[] excel = downloadBusinessProcess.getHojaCalculoOfertasNoCentro(new DownloadBusinessProcess.GetHojaCalculoOfertasNoCentroArguments(principal, dataSession, fechaInicio, fechaFin));
            controllerHelper.objectToHttpResponse(new HttpResult(null, excel, 200, false, null, MimeType.OCTET_STREAM), httpServletRequest, httpServletResponse);
        } catch (Exception ex) {
            controllerHelper.exceptionToHttpResponse(ex, httpServletResponse);
        }

    }




}
