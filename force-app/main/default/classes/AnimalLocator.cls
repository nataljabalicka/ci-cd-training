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
            // Cast the values in the 'animals' key as a list
            Object animal = (Object) results.get('animal');
            System.debug('Received the following animals:');
            System.debug(animal.name); 
            animalName = animal.name;

        }
        return animalName;
    }
}
