const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');

const QRPortalWeb = require('@bot-whatsapp/portal')
const WsProvider = require('@bot-whatsapp/provider/baileys'); 
const MockAdapter = require('@bot-whatsapp/database/mock');

const flowCita = addKeyword("cita").addAnswer("Perfecto, te envío un link para que visites nuestra página web, desde allí puedes realizar cómodamente tu agenda, además de ver los horarios disponibles. Cualquier duda que tengas la comunicas a un *asesor*",
  null, (ctx, { flowDynamic }) => {
    const generarlink = () => "https://brillantina1.wordpress.com/";
    const link = generarlink();
    flowDynamic(`El link de la página es ${link}`);
  });

  ;

const flowAsesor = addKeyword(["asesor"]).addAnswer(['Perfecto, en un momento nuestro asesor se pondrá en contacto contigo...']);
const flowPrincipal = addKeyword(["hola", "buenos días", "buenas noches", "holi", "buena tarde"])
    .addAnswer('Bienvenida a FERNANDA ROJAS BRILLANTINA SPA, espero te encuentres súper bien')
    .addAnswer("Linda, escribe *cita*, si deseas agendar una cita")
    .addAnswer("De lo contrario, escribe *asesor*, si deseas contactar con un asesor");


const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow([flowPrincipal, flowAsesor, flowCita]);
    const adapterProvider = createProvider(WsProvider);
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });
}
QRPortalWeb()
main();
