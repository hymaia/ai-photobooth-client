import Constants from "expo-constants";

export default function trackWithMixpanel(eventName: string) {
  const options = {
    method: 'POST',
    headers: { accept: 'text/plain', 'content-type': 'application/json' },
    body: JSON.stringify([{ properties: { token: Constants.expoConfig.extra.mixpanelProjectId }, event: eventName }])
  };

  fetch('https://api.mixpanel.com/track', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}
