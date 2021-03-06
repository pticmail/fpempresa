
package es.logongas.fpempresa.presentacion.controller;

import es.logongas.fpempresa.businessprocess.empresa.OfertaCRUDBusinessProcess;
import es.logongas.fpempresa.modelo.empresa.Oferta;
import es.logongas.ix3.businessprocess.CRUDBusinessProcessFactory;
import es.logongas.ix3.core.Principal;
import es.logongas.ix3.dao.DataSession;
import es.logongas.ix3.dao.DataSessionFactory;
import es.logongas.ix3.dao.metadata.MetaDataFactory;
import es.logongas.ix3.service.CRUDService;
import es.logongas.ix3.service.CRUDServiceFactory;
import es.logongas.ix3.web.util.ControllerHelper;
import es.logongas.ix3.web.util.HttpResult;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class OfertaController {
  
    @Autowired
    private MetaDataFactory metaDataFactory;

    @Autowired
    private CRUDServiceFactory crudServiceFactory;
    @Autowired
    private CRUDBusinessProcessFactory crudBusinessProcessFactory;
    @Autowired
    private ControllerHelper controllerHelper;
    @Autowired
    private DataSessionFactory dataSessionFactory;


    @RequestMapping(value = {"{path}/Oferta/{idOferta}/notificacionOferta"}, method = RequestMethod.PATCH, produces = "application/json")
    public void notificacionOferta(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, @PathVariable("idOferta") int idOferta) {

        try (DataSession dataSession = dataSessionFactory.getDataSession()) {
            Principal principal = controllerHelper.getPrincipal(httpServletRequest, httpServletResponse, dataSession);

            CRUDService<Oferta, Integer> ofertaCrudService = crudServiceFactory.getService(Oferta.class);
            Oferta oferta = ofertaCrudService.read(dataSession, idOferta);

            OfertaCRUDBusinessProcess ofertaCRUDBusinessProcess = (OfertaCRUDBusinessProcess) crudBusinessProcessFactory.getBusinessProcess(Oferta.class);

            ofertaCRUDBusinessProcess.notificacionOferta(new OfertaCRUDBusinessProcess.NotificacionOfertaArguments(principal, dataSession, oferta));

            controllerHelper.objectToHttpResponse(new HttpResult(null), httpServletRequest, httpServletResponse);
        } catch (Exception ex) {
            controllerHelper.exceptionToHttpResponse(ex, httpServletResponse);
        }

    }    
    
    
}
