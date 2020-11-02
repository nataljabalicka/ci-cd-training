public class AnimalLocator {
    public static String getAnimalNameById(Integer Id) {

        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://th-apex-http-callout.herokuapp.com/animals/' +  String.valueOf(Id));
        request.setMethod('GET');

        String animalName = '';

        HttpResponse response = http.send(request);
        // If the request is successful, parse the JSON response.
        if (response.getStatusCode() == 200) {
            // Deserializes the JSON string into collections of primitive data types.
            Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            
            List<Object> a = (List<Object>)results.get('animal');
      
            Map<String, Object> a2 = (Map<String, Object>)a[0];

            animalName = a2.get('name');

        }
        return animalName;
    }
}
