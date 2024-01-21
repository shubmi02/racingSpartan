/**
 * This nodejs module has several query functions which use Vectara's 
 * query API via REST
 */

const axios = require('axios');

function generateQueryData(query, customer_id, corpus_id) {
  const data = {
    'query': [
      {
        'query': query,
        "queryContext": "",
        "start": 0,
        "numResults": 1,
        "contextConfig": {
          "charsBefore": 0,
          "charsAfter": 0,
          "sentencesBefore": 2,
          "sentencesAfter": 2,
          "startTag": "%START_SNIPPET%",
          "endTag": "%END_SNIPPET%"
        },
        "corpusKey": [
          {
            "customerId": customer_id,
            "corpusId": corpus_id,
            "semantics": 0,
            "metadataFilter": "",
            "lexicalInterpolationConfig": {
              "lambda": 0.025
            },
            "dim": []
          }
        ],
        "summary": [
          {
            "maxSummarizedResults": 5,
            "responseLang": "eng",
            "summarizerPromptName": "vectara-summary-ext-v1.2.0"
          }
        ]
      }
    ]
  };
  return data;
};

module.exports = {
  query: async function (customer_id, corpus_id, serving_endpoint, jwt_token, textToSummarize) {
    const data = generateQueryData(`summarize this text: ${textToSummarize}`, customer_id, corpus_id);
    const config = {
      headers: {
        'Authorization': `Bearer ${jwt_token}`,
        'Content-Type': 'application/json',
        'customer-id': customer_id.toString()
      }
    };
    const result = await axios.post(`https://${serving_endpoint}/v1/query`, data, config);
    return result;
  }
};