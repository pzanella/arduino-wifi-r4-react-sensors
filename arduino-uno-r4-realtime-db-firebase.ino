#include <WiFiS3.h>
#include "WiFiSSLClient.h"
#include <ArduinoHttpClient.h>
#include <ArduinoJson.h>
#include "credentials.h"

const char ssid[] = WIFI_SSID;
const char pass[] = WIFI_PASSWORD;

String serverAddress = "arduino-db-sensors-default-rtdb.europe-west1.firebasedatabase.app";
int port = 443;
String path = "/sensors.json?auth=" + String(FIREBASE_AUTH);

WiFiSSLClient wifi;
HttpClient client = HttpClient(wifi, serverAddress, port);

int status = WL_IDLE_STATUS;

void setup() {
  Serial.begin(9600);

  while (status != WL_CONNECTED) {
    Serial.print("Attempting to connect to Network named: ");
    Serial.println(ssid);
    status = WiFi.begin(ssid, pass);
  }

  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);
}

void loop() {
  Serial.println("PUT request");
  String contentType = "application/x-www-form-urlencoded";

  float temperature = random(10, 35);
  Serial.print("Temperature :: ");
  Serial.println(temperature);

  float humidity = random(0, 100);
  Serial.print("Humidity :: ");
  Serial.println(humidity);

  JsonDocument doc;

  JsonObject temperatureJsonObject = doc["temperature"].to<JsonObject>();
  temperatureJsonObject["value"] = temperature;
  temperatureJsonObject["unitOfMeasure"] = "°C";

  JsonObject humidityJsonObject = doc["humidity"].to<JsonObject>();
  humidityJsonObject["value"] = humidity;
  humidityJsonObject["unitOfMeasure"] = "%";

  String output;
  doc.shrinkToFit();
  serializeJson(doc, output);

  Serial.println(output);

  client.put(path, contentType, output);

  int statusCode = client.responseStatusCode();
  String response = client.responseBody();

  Serial.print("Status code: ");
  Serial.println(statusCode);
  Serial.print("Response: ");
  Serial.println(response);

  client.stop();

  Serial.println("Wait ten seconds");
  delay(5000);
}
