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
                color: activeTab === 'returns' ? '#ea580c' : '#64748b',
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
                color: activeTab === 'privacy' ? '#ea580c' : '#64748b',
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
                  El producto deberá conservarse en las condiciones en las que fue recibido, sin haber sido usado, lavado, alterado ni personalizado, y conservando sus etiquetas o empaques originales cuando aplique.
                </p>

                <h4 className="font-bold text-base mt-6" style={{ color: '#00086B' }}>
                  2. Productos personalizados y pedidos especiales
                </h4>
                <p style={{ color: '#334155' }}>
                  Por tratarse de prendas confeccionadas, bordadas, estampadas o adaptadas conforme a requerimientos específicos de cada cliente, los productos personalizados no admiten cambios ni devoluciones por causas atribuibles a selección de talla, modelo, color o diseño previamente autorizado.
                </p>
                <p style={{ color: '#334155' }}>
                  En caso de presentarse algún defecto atribuible a la confección, bordado o personalización respecto a la muestra o especificación aprobada, el cliente podrá solicitar su revisión para reposición o ajuste conforme a lo acordado.
                </p>

                <h4 className="font-bold text-base mt-6" style={{ color: '#00086B' }}>
                  3. Plazos para aclaraciones
                </h4>
                <p style={{ color: '#334155' }}>
                  Cualquier aclaración relacionada con faltantes, diferencias en cantidades o inconformidades en el pedido deberá notificarse dentro de los primeros <strong style={{ color: '#0f172a' }}>5 días hábiles</strong> posteriores a la entrega física del producto.
                </p>
                <p style={{ color: '#334155' }}>
                  Transcurrido este plazo, se entenderá que el pedido ha sido recibido a entera satisfacción.
                </p>

                <h4 className="font-bold text-base mt-6" style={{ color: '#00086B' }}>
                  4. Procedimiento para solicitudes
                </h4>
                <p style={{ color: '#334155' }}>
                  Para iniciar una solicitud de revisión, cambio o reposición, el cliente deberá compartir:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-4 text-slate-700" style={{ color: '#334155' }}>
                  <li>Número de pedido, factura o cotización correspondiente.</li>
                  <li>Descripción detallada de la situación.</li>
                  <li>Fotografías o evidencia visual que permita evaluar el caso.</li>
                </ul>
                <p style={{ color: '#334155' }}>
                  Nuestro equipo dará respuesta a la solicitud en un plazo máximo de <strong style={{ color: '#0f172a' }}>3 a 5 días hábiles</strong> con las opciones de solución correspondientes.
                </p>

                <h4 className="font-bold text-base mt-6" style={{ color: '#00086B' }}>
                  5. Reemplazos y ajustes
                </h4>
                <p style={{ color: '#334155' }}>
                  Cuando proceda un cambio por defecto de fabricación, error en envío o inconformidad imputable a la empresa, Uniformes PRE gestionará la reposición o ajuste de la prenda en los tiempos de producción y entrega que se coordinen con el cliente.
                </p>

                <h4 className="font-bold text-base mt-6" style={{ color: '#00086B' }}>
                  6. Envíos en cambios y devoluciones
                </h4>
                <p style={{ color: '#334155' }}>
                  En los casos en que la devolución o cambio derive de un error imputable a Uniformes PRE o de un defecto comprobable de fabricación, los costos de recolección y reenvío correrán por nuestra cuenta.
                </p>
                <p style={{ color: '#334155' }}>
                  En situaciones no atribuibles a defecto o error en el surtido acordado, los gastos logísticos asociados podrán ser responsabilidad del cliente.
                </p>

                <h4 className="font-bold text-base mt-6" style={{ color: '#00086B' }}>
                  7. Reembolsos
                </h4>
                <p style={{ color: '#334155' }}>
                  Las solicitudes que deriven en devolución económica, en caso de aplicar conforme a la evaluación del caso, se gestionarán mediante nota de crédito aplicable a futuras compras o mediante el método de pago original en los tiempos que determine la institución financiera correspondiente.
                </p>

                <h4 className="font-bold text-base mt-6" style={{ color: '#00086B' }}>
                  8. Atención y soporte
                </h4>
                <p style={{ color: '#334155' }}>
                  Para cualquier duda, aclaración o seguimiento a un pedido, nuestro equipo se encuentra disponible a través de nuestros canales oficiales de contacto:
                </p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-slate-700" style={{ backgroundColor: '#f8fafc', color: '#334155' }}>
                  <p>
                    <strong style={{ color: '#0f172a' }}>WhatsApp:</strong>{' '}
                    <a href="https://wa.me/529988454220" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline" style={{ color: '#ea580c' }}>
                      998 845 4220
                    </a>
                  </p>
                  <p>
                    <strong style={{ color: '#0f172a' }}>Correo de atención:</strong>{' '}
                    <a href="mailto:ventas@uniformespre.com" className="font-semibold hover:underline" style={{ color: '#ea580c' }}>
                      ventas@uniformespre.com
                    </a>
                  </p>
                </div>

                <h4 className="font-bold text-base mt-6" style={{ color: '#00086B' }}>
                  9. Modificaciones a la política
                </h4>
                <p style={{ color: '#334155' }}>
                  Uniformes PRE se reserva el derecho de actualizar o modificar esta política cuando resulte necesario para mejorar nuestros procesos o cumplir con disposiciones operativas o legales. Las condiciones aplicables serán aquellas vigentes al momento de confirmar el pedido correspondiente.
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
                  En cumplimiento con lo establecido en la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (en adelante, la “Ley”), <strong style={{ color: '#0f172a' }}>Uniformes PRE</strong>, con domicilio en <strong style={{ color: '#0f172a' }}>Calle 72 Mza 34 Lote 2 SM 219, CP 77516, Cancún, Quintana Roo, México</strong>, hace de su conocimiento que es responsable del uso, tratamiento y protección de los datos personales que usted nos proporcione.
                </p>

                <h4 className="font-bold text-base mt-6" style={{ color: '#00086B' }}>
                  1. Datos personales que recabamos
                </h4>
                <p style={{ color: '#334155' }}>
                  Para la correcta atención, cotización, venta y entrega de nuestros productos y servicios, podremos solicitar los siguientes datos personales:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-4 text-slate-700" style={{ color: '#334155' }}>
                  <li>Nombre completo o razón social.</li>
                  <li>Nombre de persona de contacto o representante.</li>
                  <li>Número telefónico fijo y/o celular (incluyendo WhatsApp).</li>
                  <li>Correo electrónico.</li>
                  <li>Dirección de entrega, fiscal y/o de facturación.</li>
                  <li>Datos fiscales (RFC, constancia de situación fiscal, uso de CFDI).</li>
                  <li>Información relacionada con especificaciones de pedidos, logotipos, tallas y requerimientos de uniformes.</li>
                </ul>
                <p style={{ color: '#334155' }}>
                  Uniformes PRE no solicita ni recaba datos personales sensibles que requieran especial protección conforme a la Ley.
                </p>

                <h4 className="font-bold text-base mt-6" style={{ color: '#00086B' }}>
                  2. Finalidades del tratamiento de datos
                </h4>
                <p style={{ color: '#334155' }}>
                  Los datos personales recabados serán utilizados para las siguientes finalidades necesarias:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-4 text-slate-700" style={{ color: '#334155' }}>
                  <li>Elaboración y envío de cotizaciones comerciales.</li>
                  <li>Procesamiento de pedidos, confección y personalización de uniformes.</li>
                  <li>Gestión de facturación y cobranza.</li>
                  <li>Coordinación logística para entrega o envío de mercancía.</li>
                  <li>Comunicación directa sobre el estatus de compras, producción o entregas.</li>
                  <li>Atención a dudas, aclaraciones, garantías o servicio posventa.</li>
                </ul>
                <p style={{ color: '#334155' }}>
                  De manera adicional, podremos utilizar sus datos de contacto para finalidades secundarias que nos permiten brindarle una mejor atención, tales como:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-4 text-slate-700" style={{ color: '#334155' }}>
                  <li>Envío de catálogos actualizados, promociones o novedades de productos.</li>
                  <li>Encuestas breves de satisfacción o evaluación del servicio.</li>
                </ul>
                <p style={{ color: '#334155' }}>
                  En caso de que no desee que sus datos personales sean tratados para estas finalidades secundarias, podrá manifestarlo en cualquier momento enviando un correo a:{' '}
                  <a href="mailto:ventas@uniformespre.com" className="font-semibold hover:underline" style={{ color: '#ea580c' }}>
                    ventas@uniformespre.com
                  </a>.
                </p>

                <h4 className="font-bold text-base mt-6" style={{ color: '#00086B' }}>
                  3. Transferencia de datos personales
                </h4>
                <p style={{ color: '#334155' }}>
                  Uniformes PRE no vende, alquila ni comparte sus datos personales con terceros para fines ajenos a nuestra operación comercial.
                </p>
                <p style={{ color: '#334155' }}>Sus datos únicamente podrán ser compartidos con:</p>
                <ul className="list-disc list-inside space-y-1.5 pl-4 text-slate-700" style={{ color: '#334155' }}>
                  <li>Empresas de paquetería y logística necesarias para realizar la entrega de sus pedidos.</li>
                  <li>Proveedores de servicios tecnológicos o contables indispensables para la facturación y operación de la empresa.</li>
                  <li>Autoridades competentes cuando así lo exija la legislación aplicable.</li>
                </ul>
                <p style={{ color: '#334155' }}>
                  Estos terceros se encuentran obligados a mantener la confidencialidad de la información compartida y a utilizarla exclusivamente para el cumplimiento de los servicios contratados.
                </p>

                <h4 className="font-bold text-base mt-6" style={{ color: '#00086B' }}>
                  4. Medidas de seguridad
                </h4>
                <p style={{ color: '#334155' }}>
                  Uniformes PRE implementa medidas de seguridad técnicas, administrativas y físicas razonables para proteger sus datos personales contra daño, pérdida, alteración, destrucción o el uso, acceso o tratamiento no autorizado.
                </p>

                <h4 className="font-bold text-base mt-6" style={{ color: '#00086B' }}>
                  5. Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)
                </h4>
                <p style={{ color: '#334155' }}>
                  Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros cuando considere que no está siendo utilizada adecuadamente (Cancelación); así como oponerse al uso de sus datos para fines específicos (Oposición).
                </p>
                <p style={{ color: '#334155' }}>
                  Para el ejercicio de cualquiera de los derechos ARCO, usted deberá enviar una solicitud por escrito al correo electrónico:{' '}
                  <a href="mailto:ventas@uniformespre.com" className="font-semibold hover:underline" style={{ color: '#ea580c' }}>
                    ventas@uniformespre.com
                  </a>
                </p>
                <p style={{ color: '#334155' }}>La solicitud deberá contener:</p>
                <ul className="list-disc list-inside space-y-1.5 pl-4 text-slate-700" style={{ color: '#334155' }}>
                  <li>Nombre del titular y medio para comunicarle la respuesta.</li>
                  <li>Documentos que acrediten su identidad o la representación legal correspondiente.</li>
                  <li>Descripción clara y precisa de los datos respecto de los cuales busca ejercer alguno de los derechos ARCO.</li>
                  <li>Cualquier otro elemento que facilite la localización de los datos.</li>
                </ul>
                <p style={{ color: '#334155' }}>
                  Daremos respuesta a su solicitud en un plazo máximo de <strong style={{ color: '#0f172a' }}>10 días hábiles</strong> posteriores a la recepción de la misma.
                </p>

                <h4 className="font-bold text-base mt-6" style={{ color: '#00086B' }}>
                  6. Uso de cookies o tecnologías similares
                </h4>
                <p style={{ color: '#334155' }}>
                  Nuestro sitio web o canales digitales podrán utilizar cookies técnicas o herramientas de análisis para mejorar la experiencia de navegación, recordar preferencias y recopilar información estadística anónima de visitas. Usted puede desactivar o configurar el uso de cookies directamente en las opciones de su navegador web.
                </p>

                <h4 className="font-bold text-base mt-6" style={{ color: '#00086B' }}>
                  7. Cambios al Aviso de Privacidad
                </h4>
                <p style={{ color: '#334155' }}>
                  El presente Aviso de Privacidad podrá ser modificado o actualizado en cualquier momento derivado de requerimientos legales, cambios en nuestras prácticas operativas o mejoras en nuestros servicios.
                </p>
                <p style={{ color: '#334155' }}>
                  Cualquier modificación estará disponible para consulta a través de nuestro sitio web y canales oficiales de comunicación.
                </p>
                <p className="pt-2 border-t border-slate-200 text-xs font-semibold" style={{ color: '#64748b' }}>
                  Última actualización: Marzo 2026.
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
