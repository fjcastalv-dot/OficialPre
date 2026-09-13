import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, RotateCcw } from 'lucide-react';

interface LegalDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab: 'privacy' | 'returns';
}

export default function LegalDocsModal({ isOpen, onClose, initialTab }: LegalDocsModalProps) {
  const [activeTab, setActiveTab] = useState<'privacy' | 'returns'>(initialTab);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      id="legal-docs-modal"
    >
      {/* Backdrop Close Click */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* Modal Container */}
      <div
        className="legal-modal-card relative w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 border border-slate-200"
        style={{
          backgroundColor: '#ffffff',
          color: '#1e293b',
          maxHeight: 'calc(100vh - 48px)',
          height: '85vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Persistent Fixed Header with Tabs and Close Button */}
        <div
          className="legal-modal-header sticky top-0 z-20 flex border-b border-slate-200 p-2 sm:p-3 items-center justify-between shrink-0 shadow-sm"
          style={{
            backgroundColor: '#f8fafc',
            borderBottom: '1px solid #e2e8f0',
            position: 'sticky',
            top: 0,
            zIndex: 20
          }}
        >
          <div className="flex space-x-2 overflow-x-auto pr-2">
            {/* Button 1: Política de Devoluciones y Cambios */}
            <button
              onClick={() => setActiveTab('returns')}
              type="button"
              className="flex items-center space-x-2 px-3 sm:px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all rounded-lg cursor-pointer whitespace-nowrap"
              style={{
                color: activeTab === 'returns' ? '#ea580c' : '#334155',
                backgroundColor: activeTab === 'returns' ? '#ffffff' : 'transparent',
                borderBottom: activeTab === 'returns' ? '2px solid #ea580c' : '2px solid transparent',
                boxShadow: activeTab === 'returns' ? '0 1px 3px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              <RotateCcw className="h-4 w-4 text-orange-500 shrink-0" />
              <span>POLÍTICA DE DEVOLUCIONES Y CAMBIOS</span>
            </button>

            {/* Button 2: Aviso de Privacidad Uniformes PRE */}
            <button
              onClick={() => setActiveTab('privacy')}
              type="button"
              className="flex items-center space-x-2 px-3 sm:px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all rounded-lg cursor-pointer whitespace-nowrap"
              style={{
                color: activeTab === 'privacy' ? '#ea580c' : '#334155',
                backgroundColor: activeTab === 'privacy' ? '#ffffff' : 'transparent',
                borderBottom: activeTab === 'privacy' ? '2px solid #ea580c' : '2px solid transparent',
                boxShadow: activeTab === 'privacy' ? '0 1px 3px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              <ShieldCheck className="h-4 w-4 text-orange-500 shrink-0" />
              <span>Aviso de Privacidad Uniformes PRE</span>
            </button>
          </div>

          {/* Persistent Close 'X' Button fixed at upper right */}
          <button
            onClick={onClose}
            type="button"
            className="legal-modal-close-btn p-1.5 sm:p-2 ml-2 rounded-full border border-slate-300 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 transition-all cursor-pointer shrink-0 shadow-sm"
            style={{ color: '#0f172a', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1' }}
            aria-label="Cerrar modal"
            title="Cerrar pestaña"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content Body - Independently scrolls while header remains fixed */}
        <div
          className="legal-modal-body flex-1 overflow-y-auto min-h-0 p-6 sm:p-8 space-y-6 font-sans text-sm leading-relaxed scrollbar-thin"
          style={{
            backgroundColor: '#ffffff',
            color: '#334155',
            overflowY: 'auto',
            minHeight: 0,
            flex: '1 1 0%'
          }}
        >
          {/* ========================================================================= */}
          {/* TAB 1: POLÍTICA DE DEVOLUCIONES Y CAMBIOS */}
          {/* ========================================================================= */}
          {activeTab === 'returns' ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 border-b border-slate-200 pb-3">
                <RotateCcw className="h-6 w-6 text-orange-500 shrink-0" />
                <h3
                  className="font-display text-xl sm:text-2xl tracking-wide font-bold uppercase"
                  style={{ color: '#00086B' }}
                >
                  POLÍTICA DE DEVOLUCIONES Y CAMBIOS
                </h3>
              </div>

              <div className="space-y-4 text-slate-700" style={{ color: '#334155' }}>
                <p style={{ color: '#334155' }}>
                  En <strong style={{ color: '#0f172a' }}>Uniformes PRE</strong> trabajamos para entregar productos que cumplan con las características, cantidades y especificaciones acordadas en cada pedido. Nuestra prioridad es ofrecer una experiencia de compra clara, profesional y respaldada por un servicio de atención personalizado.
                </p>

                <h4 className="font-bold text-base mt-6" style={{ color: '#00086B' }}>
                  1. Productos de línea
                </h4>
                <p style={{ color: '#334155' }}>
                  Los productos de línea podrán ser sujetos a cambio o devolución cuando presenten un defecto de fabricación, hayan sido enviados de manera incorrecta o no correspondan con las características especificadas en la orden de compra.
                </p>
                <p style={{ color: '#334155' }}>
                  Para solicitar un cambio o devolución, el cliente deberá comunicarse con nuestro equipo de atención dentro de un plazo de <strong style={{ color: '#0f172a' }}>5 días hábiles</strong> posteriores a la recepción del pedido.
                </p>
                <p style={{ color: '#334155' }}>
                  El producto deberá conservarse en las condiciones en las que fue recibido, sin haber sido utilizado, lavado, alterado o modificado.
                </p>

                <h4 className="font-bold text-base mt-6" style={{ color: '#00086B' }}>
                  2. Productos personalizados o confeccionados sobre pedido
                </h4>
                <p style={{ color: '#334155' }}>
                  Los uniformes y productos elaborados de acuerdo con especificaciones particulares del cliente —incluyendo medidas, colores, diseños, bordados, sublimados, estampados, logotipos, cortes o cualquier otra personalización— no son susceptibles de devolución por cambio de opinión, talla, color o diseño una vez iniciada su producción, debido a que han sido fabricados específicamente para cada proyecto.
                </p>
                <p style={{ color: '#334155' }}>
                  Antes de iniciar la producción, nuestro equipo asesora al cliente y confirma las especificaciones del pedido para minimizar cualquier error.
                </p>
                <p style={{ color: '#334155' }}>
                  Lo anterior no limita los derechos que correspondan al consumidor cuando exista un defecto de fabricación, incumplimiento de las especificaciones acordadas o alguna otra causa contemplada por la legislación aplicable.
                </p>

                <h4 className="font-bold text-base mt-6" style={{ color: '#00086B' }}>
                  3. Productos con defectos de fabricación
                </h4>
                <p style={{ color: '#334155' }}>
                  Si un producto presenta un defecto atribuible a su fabricación, el cliente deberá reportarlo dentro del periodo de garantía correspondiente.
                </p>
                <p style={{ color: '#334155' }}>
                  Una vez recibido el reporte, Uniformes PRE evaluará el caso y, cuando corresponda, podrá ofrecer reparación, reposición del producto, cambio o la solución que legalmente proceda.
                </p>
                <p style={{ color: '#334155' }}>
                  Cuando resulte aplicable una garantía, esta será informada al cliente de manera clara junto con sus condiciones y procedimiento para hacerla efectiva.
                </p>

                <h4 className="font-bold text-base mt-6" style={{ color: '#00086B' }}>
                  4. Productos incorrectos o faltantes
                </h4>
                <p style={{ color: '#334155' }}>
                  Si recibes un producto diferente al solicitado o detectas piezas faltantes, comunícate con nosotros dentro de los <strong style={{ color: '#0f172a' }}>5 días hábiles</strong> posteriores a la recepción.
                </p>
                <p style={{ color: '#334155' }}>
                  Nuestro equipo revisará la orden de compra y la evidencia proporcionada para determinar la solución correspondiente.
                </p>

                <h4 className="font-bold text-base mt-6" style={{ color: '#00086B' }}>
                  5. Requisitos para solicitar un cambio o devolución
                </h4>
                <p style={{ color: '#334155' }}>Para iniciar una solicitud, será necesario proporcionar:</p>
                <ul className="list-disc list-inside space-y-1.5 pl-4 text-slate-700" style={{ color: '#334155' }}>
                  <li>Número de pedido, cotización o factura.</li>
                  <li>Nombre del cliente o empresa.</li>
                  <li>Descripción del inconveniente.</li>
                  <li>Fotografías o evidencia del producto, cuando corresponda.</li>
                  <li>Datos de contacto para dar seguimiento al caso.</li>
                </ul>
                <p style={{ color: '#64748b' }}>
                  El producto podrá ser solicitado para revisión física cuando sea necesario.
                </p>

                <h4 className="font-bold text-base mt-6" style={{ color: '#00086B' }}>
                  6. Gastos de envío
                </h4>
                <p style={{ color: '#334155' }}>
                  Cuando el cambio o reposición sea consecuencia de un error atribuible a Uniformes PRE o de un defecto de fabricación cubierto por la garantía, se determinará la forma de cubrir los gastos de envío correspondientes.
                </p>
                <p style={{ color: '#334155' }}>
                  Cuando la solicitud derive de una causa no atribuible a Uniformes PRE, los gastos de traslado podrán correr por cuenta del cliente, siempre que legalmente corresponda.
                </p>

                <h4 className="font-bold text-base mt-6" style={{ color: '#00086B' }}>
                  7. Cancelaciones
                </h4>
                <p style={{ color: '#334155' }}>
                  Las solicitudes de cancelación deberán realizarse antes de que el pedido entre en producción.
                </p>
                <p style={{ color: '#334155' }}>
                  Una vez iniciada la fabricación, personalización, bordado, sublimado, estampado o cualquier otro proceso específico para el cliente, la posibilidad de cancelación estará sujeta al avance del pedido y a los costos ya generados.
                </p>

                <h4 className="font-bold text-base mt-6" style={{ color: '#00086B' }}>
                  8. Proceso de atención
                </h4>
                <p style={{ color: '#334155' }}>
                  Una vez recibida la solicitud, nuestro equipo revisará la información y se pondrá en contacto con el cliente para indicar los siguientes pasos.
                </p>
                <p style={{ color: '#334155' }}>
                  Buscamos resolver cada caso de manera clara, profesional y justa, procurando siempre ofrecer una solución acorde con las características del pedido y la legislación aplicable.
                </p>

                <h4 className="font-bold text-base mt-6" style={{ color: '#00086B' }}>
                  9. Derechos del consumidor
                </h4>
                <p style={{ color: '#334155' }}>
                  Esta política se interpreta y aplica de conformidad con la Ley Federal de Protección al Consumidor y demás disposiciones aplicables en México. Ninguna disposición de esta política pretende limitar los derechos que legalmente correspondan al consumidor.
                </p>
                <p className="pt-2 border-t border-slate-200 text-slate-500" style={{ color: '#64748b' }}>
                  Para cualquier duda, aclaración o solicitud relacionada con un pedido, puedes contactar a nuestro equipo de atención a través de los medios oficiales publicados en este sitio web.
                </p>
              </div>
            </div>
          ) : (
            /* ========================================================================= */
            /* TAB 2: AVISO DE PRIVACIDAD UNIFORMES PRE */
            /* ========================================================================= */
            <div className="space-y-4">
              <div className="flex items-center space-x-3 border-b border-slate-200 pb-3">
                <ShieldCheck className="h-6 w-6 text-orange-500 shrink-0" />
                <h3
                  className="font-display text-xl sm:text-2xl tracking-wide font-bold uppercase"
                  style={{ color: '#00086B' }}
                >
                  Aviso de Privacidad Uniformes PRE
                </h3>
              </div>

              <div className="space-y-4 text-slate-700" style={{ color: '#334155' }}>
                <p style={{ color: '#334155' }}>
                  Confecciones y Uniformes PRE (en lo sucesivo Uniformes PRE) con domicilio en Calle Onyx Lote 19 supermanzana 531 Cancún Quintana Roo, es el responsable del uso y protección de sus datos personales, y al respecto le informamos lo siguiente:
                </p>

                <h4 className="font-bold text-base mt-6" style={{ color: '#00086B' }}>
                  ¿Para qué fines utilizaremos sus datos personales?
                </h4>
                <p style={{ color: '#334155' }}>
                  Los datos personales que recabamos de usted, los utilizaremos para las siguientes finalidades que son necesarias para el servicio que solicita:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-4 text-slate-700" style={{ color: '#334155' }}>
                  <li>Respuesta a mensajes del formulario de contacto</li>
                  <li>Prestación de cualquier servicio solicitado.</li>
                  <li>Compra de algún producto</li>
                </ul>

                <h4 className="font-bold text-base mt-6" style={{ color: '#00086B' }}>
                  ¿Qué datos personales utilizaremos para estos fines?
                </h4>
                <p style={{ color: '#334155' }}>
                  Para llevar a cabo las finalidades descritas en el presente aviso de privacidad, utilizaremos los siguientes datos personales:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-4 text-slate-700" style={{ color: '#334155' }}>
                  <li>Datos de identificación y contacto</li>
                  <li>Datos laborales</li>
                </ul>

                <h4 className="font-bold text-base mt-6" style={{ color: '#00086B' }}>
                  ¿Con quién compartimos su información personal y para qué fines?
                </h4>
                <p style={{ color: '#334155' }}>
                  Le informamos que sus datos personales no son compartidos fuera del país, a excepción de los compartidos con empresas que nos brindan servicios relacionados con tecnología.
                </p>
                <p style={{ color: '#334155' }}>Dentro del país:</p>
                <ul className="list-disc list-inside space-y-1.5 pl-4 text-slate-700" style={{ color: '#334155' }}>
                  <li>Uniformes PRE para prospección de clientes.</li>
                </ul>

                <h4 className="font-bold text-base mt-6" style={{ color: '#00086B' }}>
                  ¿Cómo puede acceder, rectificar o cancelar sus datos personales, u oponerse a su uso o ejercer la revocación de consentimiento?
                </h4>
                <p style={{ color: '#334155' }}>
                  Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros o bases de datos cuando considere que la misma no está siendo utilizada adecuadamente (Cancelación); así como oponerse al uso de sus datos personales para fines específicos (Oposición). Estos derechos se conocen como derechos ARCO.
                </p>
                <p style={{ color: '#334155' }}>
                  Para el ejercicio de cualquiera de los derechos ARCO, debe enviar una petición vía correo electrónico a{' '}
                  <a href="mailto:direccion@uniformespre.com" className="font-semibold hover:underline" style={{ color: '#ea580c' }}>
                    direccion@uniformespre.com
                  </a>{' '}
                  y deberá contener:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-4 text-slate-700" style={{ color: '#334155' }}>
                  <li>Nombre completo del titular.</li>
                  <li>Domicilio.</li>
                  <li>Teléfono.</li>
                  <li>Correo electrónico usado en este sitio web.</li>
                  <li>Copia de una identificación oficial adjunta.</li>
                  <li>Asunto «Derechos ARCO»</li>
                  <li>
                    Descripción el objeto del escrito, los cuales pueden ser de manera enunciativa más no limitativa los siguientes: Revocación del consentimiento para tratar sus datos personales; y/o Notificación del uso indebido del tratamiento de sus datos personales; y/o Ejercitar sus Derechos ARCO, con una descripción clara y precisa de los datos a Acceder, Rectificar, Cancelar o bien, Oponerse. En caso de Rectificación de datos personales, deberá indicar la modificación exacta y anexar la documentación soporte; es importante en caso de revocación del consentimiento, que tenga en cuenta que no en todos los casos podremos atender su solicitud o concluir el uso de forma inmediata, ya que es posible que por alguna obligación legal requiramos seguir tratando sus datos personales. Asimismo, usted deberá considerar que para ciertos fines, la revocación de su consentimiento implicará que no le podamos seguir prestando el servicio que nos solicitó, o la conclusión de su relación con nosotros.
                  </li>
                </ul>

                <h4 className="font-bold text-base mt-6" style={{ color: '#00086B' }}>
                  ¿En cuántos días le daremos respuesta a su solicitud?
                </h4>
                <p style={{ color: '#334155' }}>
                  10 días hábiles
                </p>

                <h4 className="font-bold text-base mt-6" style={{ color: '#00086B' }}>
                  ¿Por qué medio le comunicaremos la respuesta a su solicitud?
                </h4>
                <p style={{ color: '#334155' }}>
                  Al mismo correo electrónico de donde se envió la petición.
                </p>

                <h4 className="font-bold text-base mt-6" style={{ color: '#00086B' }}>
                  El uso de tecnologías de rastreo en nuestro portal de internet
                </h4>
                <p style={{ color: '#334155' }}>
                  Le informamos que en nuestra página de internet utilizamos cookies, web beacons u otras tecnologías, a través de las cuales es posible monitorear su comportamiento como usuario de internet, así como brindarle un mejor servicio y experiencia al navegar en nuestra página. Los datos personales que obtenemos de estas tecnologías de rastreo son los siguientes:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-4 text-slate-700" style={{ color: '#334155' }}>
                  <li>Identificadores, nombre de usuario y contraseñas de sesión</li>
                  <li>Idioma preferido por el usuario</li>
                  <li>Región en la que se encuentra el usuario</li>
                  <li>Tipo de navegador del usuario</li>
                  <li>Tipo de sistema operativo del usuario</li>
                  <li>Páginas web visitadas por un usuario</li>
                  <li>Búsquedas realizadas por un usuario</li>
                  <li>Publicidad revisada por un usuario</li>
                  <li>Listas y hábitos de consumo en páginas de compras</li>
                </ul>
                <p style={{ color: '#334155' }}>
                  Estas cookies, web beacons y otras tecnologías pueden ser deshabilitadas. Para conocer cómo hacerlo, consulte el menú de ayuda de su navegador. Tenga en cuenta que, en caso de desactivar las cookies, es posible que no pueda acceder a ciertas funciones personalizadas en nuestro Sitio Web.
                </p>

                <h4 className="font-bold text-base mt-6" style={{ color: '#00086B' }}>
                  ¿Cómo puede conocer los cambios en este Aviso de Privacidad?
                </h4>
                <p style={{ color: '#334155' }}>
                  El presente aviso de privacidad puede sufrir modificaciones, cambios o actualizaciones derivadas de nuevos requerimientos legales; de nuestras propias necesidades por los productos o servicios que ofrecemos; de nuestras prácticas de privacidad; de cambios en nuestro modelo de negocio, o por otras causas. Nos comprometemos a mantener actualizado este aviso de privacidad sobre los cambios que pueda sufrir y siempre podrá consultar las actualizaciones que existan en el sitio web{' '}
                  <a href="http://uniformespre.com/" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline" style={{ color: '#ea580c' }}>
                    uniformespre.com
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Persistent Fixed Footer with 'Entendido' Button */}
        <div
          className="legal-modal-footer sticky bottom-0 z-20 border-t border-slate-200 p-3 sm:p-4 flex justify-end shrink-0"
          style={{
            backgroundColor: '#f8fafc',
            borderTop: '1px solid #e2e8f0',
            position: 'sticky',
            bottom: 0,
            zIndex: 20
          }}
        >
          <button
            onClick={onClose}
            type="button"
            className="px-6 py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-lg transition-colors text-xs uppercase tracking-wider cursor-pointer shadow-sm hover:shadow active:scale-95"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
