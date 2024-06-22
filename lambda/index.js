/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
// i18n dependencies. i18n is the main module, sprintf allows us to include variables with '%s'.
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

// We create a language strings object containing all of our strings. // The keys for each string will then be referenced in our code// e.g. requestAttributes.t('WELCOME')

const languageStrings = {
    en: {
        translation: {
            WELCOME_MESSAGE: 'Hello, thank you for using Human Body Curiosities, to get started you can say: ',
            HELLO_MESSAGE: 'Hello World!',
            HELP_MESSAGE: 'How can I help you? To request a fun fact about the human body you can say: ',
            GOODBYE_MESSAGE: 'Goodbye!',
            REFLECTOR_MESSAGE: 'You just triggered %s',
            FALLBACK_MESSAGE: 'Sorry, I don\'t know about that. Please try again.',
            ERROR_MESSAGE: 'Sorry, there was an error. Please try again.',
            RANDOM_FRASES: 'tell me a curious fact about the human body... tell me something interesting about the human body... give me a curious fact about the human body... I want to know something interesting about the human body.',
            END_MESSAGE_WELCOME: '.. or if you want to stop me just say, Cancel!... so... Do you want to start?',
            END_MESSAGE_HELP: '.. or if you want to stop me just say, Cancel!... so... How can I help you?',
            GET_FACT_MESSAGE: 'A curious fact about the human body is: ',
            FACTS: [
                'The human brain has about 86 billion neurons.',
                'If laid end to end, the blood vessels in the human body would circle the Earth four times.',
                'The skin is the largest organ of the human body.',
                'The human heart beats around 100,000 times a day.',
                'The human body contains enough carbon to make 900 pencils.'
            ]
        }
    },
    es: {
        translation: {
            WELCOME_MESSAGE: 'Hola, gracias por usar Curiosidades del Cuerpo Humano, para comenzar puedes decir: ',
            HELLO_MESSAGE: '¡Hola Mundo!',
            HELP_MESSAGE: '¿Cómo te puedo ayudar? Para pedir un dato curioso sobre el cuerpo humano puedes decir: ',
            GOODBYE_MESSAGE: '¡Adiós!',
            REFLECTOR_MESSAGE: 'Acabas de activar %s',
            FALLBACK_MESSAGE: 'Lo siento, no sé nada sobre eso. Por favor inténtalo otra vez.',
            ERROR_MESSAGE: 'Lo siento, ha habido un problema. Por favor inténtalo otra vez.',
            RANDOM_FRASES: 'dime un dato curioso sobre el cuerpo humano... cuéntame algo interesante sobre el cuerpo humano... dame un dato curioso del cuerpo humano... quiero saber una curiosidad sobre el cuerpo humano.',
            END_MESSAGE_WELCOME: '.. o si deseas detenerme solo di, ¡Cancela!... entonces... ¿Quieres comenzar?',
            END_MESSAGE_HELP: '.. o si deseas detenerme solo di, ¡Cancela!... entonces... ¿Cómo te puedo ayudar?',
            GET_FACT_MESSAGE: 'Un dato curioso sobre el cuerpo humano es: ',
            FACTS: [
                'El cerebro humano tiene aproximadamente 86 mil millones de neuronas.',
                'Si se colocaran de extremo a extremo, los vasos sanguíneos en el cuerpo humano rodearían la Tierra cuatro veces.',
                'La piel es el órgano más grande del cuerpo humano.',
                'El corazón humano late alrededor de 100,000 veces al día.',
                'El cuerpo humano contiene suficiente carbono para hacer 900 lápices.'
            ]
        }
    }
};


const FrasesRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'FrasesIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const facts = requestAttributes.t('FACTS');
        const factIndex = Math.floor(Math.random() * facts.length);
        const randomFact = facts[factIndex];
        const speakOutput = requestAttributes.t('GET_FACT_MESSAGE') + randomFact;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(requestAttributes.t('HELP_MESSAGE'))
            .getResponse();
    }
};


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const welcomeMessage = requestAttributes.t('WELCOME_MESSAGE');
        const randomPhrases = requestAttributes.t('RANDOM_FRASES');
        const endMessageWelcome = requestAttributes.t('END_MESSAGE_WELCOME');
        const speakOutput = `${welcomeMessage} ${randomPhrases}${endMessageWelcome} `;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};



const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELLO_MESSAGE');
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const helpMessage = requestAttributes.t('HELP_MESSAGE');
        const randomPhrases = requestAttributes.t('RANDOM_FRASES');
        const endMessageHelp = requestAttributes.t('END_MESSAGE_HELP');
        const speakOutput =  `${helpMessage} ${randomPhrases} ${endMessageHelp} `;
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('GOODBYE_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('FALLBACK_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log( `~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)} `);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('REFLECTOR_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('ERROR_MESSAGE');
        console.log( `~~~~ Error handled: ${JSON.stringify(error)} `);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// This request interceptor will log all incoming requests to this lambda
const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log( `Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)} `);
    }
};

// This response interceptor will log all outgoing responses of this lambda
const LoggingResponseInterceptor = {
    process(handlerInput, response) {
      console.log( `Outgoing response: ${JSON.stringify(response)} `);
    }
};

// This request interceptor will bind a translation function 't' to the requestAttributes.
const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      fallbackLng: 'en',
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: languageStrings,
      returnObjects: true
    });

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function (...args) {
      return localizationClient.t(...args);
    }
  }
}

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        FrasesRequestHandler,  // Agrega este nuevo handler aquí
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(
        LocalizationInterceptor,
        LoggingRequestInterceptor)
    .addResponseInterceptors(
        LoggingResponseInterceptor)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();