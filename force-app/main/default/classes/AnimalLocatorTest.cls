@isTest
private class AnimalLocatorTest {

        @isTest static void testAnimalCallout() {
        // Set mock callout class 
        Test.setMock(HttpCalloutMock.class, new AnimalLocatorMock()); 
        // This causes a fake response to be sent
        // from the class that implements HttpCalloutMock. 
        Integer Id = 1;
        String response = AnimalLocator.getAnimalNameById(Id);
        
        System.assertEquals(response, 'chicken');

    }
}