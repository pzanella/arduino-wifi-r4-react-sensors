#include <WiFiS3.h>
#include "WiFiSSLClient.h"
#include <ArduinoHttpClient.h> // Library to simplify HTTP fetching on Arduino (https://github.com/arduino-libraries/ArduinoHttpClient)
#include <ArduinoJson.h> // ArduinoJson - https://arduinojson.org
#include "credentials.h"
#include <DHT.h> // Adafruit DHT library (https://github.com/adafruit/DHT-sensor-library)

#define DHTPIN 8
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);

const char ssid[] = WIFI_SSID;
const char pass[] = WIFI_PASSWORD;

// Database url with "europe-west1" region
String serverAddress = "arduino-wifi-r4-react-sensors-default-rtdb.europe-west1.firebasedatabase.app";
// HTTPS port
int port = 443;
// Database path
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

  dht.begin();
}

void loop() {
  Serial.println("PUT request");
  // Set HTTP header
  String contentType = "application/x-www-form-urlencoded";

  // Read temperature value from DHT22
  float temperature = dht.readTemperature();
  Serial.print("Temperature :: ");
  Serial.println(temperature);

  // Read humidity value from DHT22
  float humidity = dht.readHumidity();
  Serial.print("Humidity :: ");
  Serial.println(humidity);

  // Create JSON structure
  JsonDocument doc;

  JsonObject temperatureJsonObject = doc["temperature"].to<JsonObject>();
  temperatureJsonObject["value"] = String(temperature, 2);
  temperatureJsonObject["unitOfMeasure"] = "°C";

  JsonObject humidityJsonObject = doc["humidity"].to<JsonObject>();
  humidityJsonObject["value"] = String(humidity, 2);
  humidityJsonObject["unitOfMeasure"] = "%";

  String output;
  doc.shrinkToFit();
  serializeJson(doc, output);

  Serial.println(output);

  // PUT request with parameters
  client.put(path, contentType, output);

  // Response status code
  int statusCode = client.responseStatusCode();
  // Response body
  String response = client.responseBody();

  Serial.print("Status code: ");
  Serial.println(statusCode);
  Serial.print("Response: ");
  Serial.println(response);

  // HTTP client stop
  client.stop();

  Serial.println("Wait thirty seconds");
  delay(30000);
}
