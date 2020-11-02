@isTest
private class AnimalLocatorTest {

        @isTest static void testAnimalCallout() {
        // Set mock callout class 
        Test.setMock(HttpCalloutMock.class, new AnimalLocatorMock()); 
        // This causes a fake response to be sent
        // from the class that implements HttpCalloutMock. 
        Integer Id = 1;
        HttpResponse response = AnimalLocator.getAnimalNameById(Id);
        // Verify that the response received contains fake values
        String contentType = response.getHeader('Content-Type');
        System.assert(contentType == 'application/json');
        String actualValue = response.getBody();
        System.debug(response.getBody());
        String expectedValue = '{"animal":{"id":1,"name":"chicken","eats":"chicken food","says":"cluck cluck"}}';
        System.assertEquals(actualValue, expectedValue);
        System.assertEquals(200, response.getStatusCode());
    }
}
