import XHRInterceptor from 'api/interceptor';
import { PersistentStorage } from 'api/storage';
import MockedRequests from 'api/mocked-requests';
import Scenarios from 'api/scenarios';
import Requests from 'api/requests';

class PublicAPI {

  constructor() {
    this.version = '0.0.1';
  }

  get capturedRequests() {
    return Requests.capturedRequests;
  }

  get mockedRequests() {
    return MockedRequests.mockedRequests;
  }

  get scenarios() {
    return Scenarios.scenarios;
  }

  get rawData() {
    return PersistentStorage.getRaw();
  }

  addScenario(name) {
    Scenarios.addScenario(name);
  }

  renameScenario(scenarioId, newName) {
    Scenarios.renameScenario(scenarioId, newName);
  }

  removeScenario(scenarioId) {
    Scenarios.removeScenario(scenarioId);
  }

  duplicateScenario(scenarioId) {
    Scenarios.duplicateScenario(scenarioId);
  }

  setCurrentScenario(scenarioId) {
    Scenarios.setCurrentScenario(scenarioId);
  }

  getCurrentScenario() {
    return Scenarios.getCurrentScenario();
  }

  addMockedRequestToScenario(scenarioId, mockedRequestId) {
    Scenarios.addMockedRequestToScenario(scenarioId, mockedRequestId);
  }

  mockRequest(request) {
    MockedRequests.addMockedRequest(request);
  }

  clearStorage() {
    PersistentStorage.clear();
  }

}

export const API = new PublicAPI();