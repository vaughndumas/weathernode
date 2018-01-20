// Get weather information from WeatherUnderground
var v_request = require('request');
const v_wu_key = "4aa3669ef7360f4b";
const v_wu_feature = "conditions";
const v_wu_city = "Australia/Canberra";
const v_iot_platform = "https://dweet.io/dweet/for/";
const v_iot_device = "vaughndumas_wu";
var v_wu_host = "http://api.wunderground.com/api/" + v_wu_key + "/" + v_wu_feature + "/q/" + v_wu_city + ".json";

v_request.get(v_wu_host, (x_error, x_response, x_body) => {
    if (x_error) {
       return console.dir(x_error);
    }
    v_json_data = JSON.parse(x_body);
    v_temp_c = v_json_data.current_observation.temp_c;
    v_relative_humidity = v_json_data.current_observation.relative_humidity;
    v_relative_humidity = v_relative_humidity.substring(0, v_relative_humidity.length - 1);
    v_wind_dir = v_json_data.current_observation.wind_dir;
    v_wind_speed = v_json_data.current_observation.wind_kph;

    /*
     * Post data to dweet.io
     * To get the data:  https://dweet.io/get/dweets/for/vaughndumas_wu
     * To get the latest data:  https://dweet.io/get/latest/dweet/for/vaughndumas_wu
     */
    v_dweet_text = JSON.stringify(
            {"celcius":v_temp_c,
             "humidity":v_relative_humidity ,
             "windspeed":v_wind_speed});
         
    v_request.post({
        "headers": {"content-type": "application/json"},
        "url": v_iot_platform + v_iot_device,
        "body": v_dweet_text
    }, (x_error, x_response, x_body) => {
        if (x_error) {
            return console.dir(x_error);
        }
        console.dir(JSON.parse(x_body));
    });
});
    

    
    
    

