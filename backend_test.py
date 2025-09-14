#!/usr/bin/env python3
"""
Backend API Testing for Vox Radio Dashboard
Tests all backend endpoints including VDO.Ninja integration
"""

import requests
import json
import sys
from datetime import datetime
import time

# Backend URL from frontend environment
BACKEND_URL = "https://vox-radio.preview.emergentagent.com/api"

class BackendTester:
    def __init__(self):
        self.results = []
        self.failed_tests = []
        self.passed_tests = []
        
    def log_result(self, test_name, success, message, response_data=None):
        """Log test result"""
        result = {
            "test": test_name,
            "success": success,
            "message": message,
            "timestamp": datetime.now().isoformat(),
            "response_data": response_data
        }
        self.results.append(result)
        
        if success:
            self.passed_tests.append(test_name)
            print(f"✅ {test_name}: {message}")
        else:
            self.failed_tests.append(test_name)
            print(f"❌ {test_name}: {message}")
            
        if response_data:
            print(f"   Response: {json.dumps(response_data, indent=2)}")
        print()

    def test_health_check(self):
        """Test GET /api/health endpoint"""
        try:
            response = requests.get(f"{BACKEND_URL}/health", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "status" in data and "database" in data and "timestamp" in data:
                    self.log_result(
                        "Health Check", 
                        True, 
                        f"Health check passed - Status: {data['status']}, DB: {data['database']}", 
                        data
                    )
                else:
                    self.log_result(
                        "Health Check", 
                        False, 
                        "Health check response missing required fields", 
                        data
                    )
            else:
                self.log_result(
                    "Health Check", 
                    False, 
                    f"Health check failed with status {response.status_code}", 
                    response.text
                )
                
        except Exception as e:
            self.log_result("Health Check", False, f"Health check request failed: {str(e)}")

    def test_server_time(self):
        """Test GET /api/server-time endpoint"""
        try:
            response = requests.get(f"{BACKEND_URL}/server-time", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["utc", "monrovia", "timezone", "offset"]
                
                if all(field in data for field in required_fields):
                    # Validate timezone info
                    if data["timezone"] == "Africa/Monrovia" and data["offset"] == "+00:00":
                        self.log_result(
                            "Server Time", 
                            True, 
                            "Server time endpoint working correctly", 
                            data
                        )
                    else:
                        self.log_result(
                            "Server Time", 
                            False, 
                            f"Incorrect timezone data - Expected Africa/Monrovia +00:00, got {data['timezone']} {data['offset']}", 
                            data
                        )
                else:
                    missing_fields = [f for f in required_fields if f not in data]
                    self.log_result(
                        "Server Time", 
                        False, 
                        f"Server time response missing fields: {missing_fields}", 
                        data
                    )
            else:
                self.log_result(
                    "Server Time", 
                    False, 
                    f"Server time failed with status {response.status_code}", 
                    response.text
                )
                
        except Exception as e:
            self.log_result("Server Time", False, f"Server time request failed: {str(e)}")

    def test_vdo_ninja_get_settings(self):
        """Test GET /api/vdo-ninja-settings endpoint"""
        try:
            response = requests.get(f"{BACKEND_URL}/vdo-ninja-settings", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["vdoDirectorUrl", "vdoGuestUrl", "audioOnly", "proAudio", "cleanUI", "audioBitrateKbps"]
                
                if all(field in data for field in required_fields):
                    # Validate data types
                    if (isinstance(data["audioOnly"], bool) and 
                        isinstance(data["proAudio"], bool) and 
                        isinstance(data["cleanUI"], bool) and 
                        isinstance(data["audioBitrateKbps"], int)):
                        self.log_result(
                            "VDO.Ninja GET Settings", 
                            True, 
                            "VDO.Ninja settings retrieved successfully", 
                            data
                        )
                        return data  # Return for use in POST test
                    else:
                        self.log_result(
                            "VDO.Ninja GET Settings", 
                            False, 
                            "VDO.Ninja settings have incorrect data types", 
                            data
                        )
                else:
                    missing_fields = [f for f in required_fields if f not in data]
                    self.log_result(
                        "VDO.Ninja GET Settings", 
                        False, 
                        f"VDO.Ninja settings missing fields: {missing_fields}", 
                        data
                    )
            else:
                self.log_result(
                    "VDO.Ninja GET Settings", 
                    False, 
                    f"VDO.Ninja GET failed with status {response.status_code}", 
                    response.text
                )
                
        except Exception as e:
            self.log_result("VDO.Ninja GET Settings", False, f"VDO.Ninja GET request failed: {str(e)}")
            
        return None

    def test_vdo_ninja_post_settings(self, current_settings=None):
        """Test POST /api/vdo-ninja-settings endpoint"""
        try:
            # Test data for VDO.Ninja settings
            test_settings = {
                "vdoDirectorUrl": "https://vdo.ninja/?director=test123",
                "vdoGuestUrl": "https://vdo.ninja/?view=test123",
                "audioOnly": True,
                "proAudio": False,
                "cleanUI": True,
                "audioBitrateKbps": 256
            }
            
            response = requests.post(
                f"{BACKEND_URL}/vdo-ninja-settings", 
                json=test_settings,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") == True:
                    self.log_result(
                        "VDO.Ninja POST Settings", 
                        True, 
                        "VDO.Ninja settings saved successfully", 
                        data
                    )
                    
                    # Verify the settings were actually saved by getting them again
                    time.sleep(1)  # Brief delay to ensure DB write completes
                    verify_response = requests.get(f"{BACKEND_URL}/vdo-ninja-settings", timeout=10)
                    if verify_response.status_code == 200:
                        saved_data = verify_response.json()
                        if (saved_data["vdoDirectorUrl"] == test_settings["vdoDirectorUrl"] and
                            saved_data["vdoGuestUrl"] == test_settings["vdoGuestUrl"] and
                            saved_data["audioBitrateKbps"] == test_settings["audioBitrateKbps"]):
                            self.log_result(
                                "VDO.Ninja Settings Persistence", 
                                True, 
                                "VDO.Ninja settings persisted correctly in database", 
                                saved_data
                            )
                        else:
                            self.log_result(
                                "VDO.Ninja Settings Persistence", 
                                False, 
                                "VDO.Ninja settings not persisted correctly", 
                                {"expected": test_settings, "actual": saved_data}
                            )
                    
                    # Restore original settings if they existed
                    if current_settings:
                        requests.post(
                            f"{BACKEND_URL}/vdo-ninja-settings", 
                            json=current_settings,
                            headers={"Content-Type": "application/json"},
                            timeout=10
                        )
                        
                else:
                    self.log_result(
                        "VDO.Ninja POST Settings", 
                        False, 
                        f"VDO.Ninja settings save failed: {data.get('message', 'Unknown error')}", 
                        data
                    )
            else:
                self.log_result(
                    "VDO.Ninja POST Settings", 
                    False, 
                    f"VDO.Ninja POST failed with status {response.status_code}", 
                    response.text
                )
                
        except Exception as e:
            self.log_result("VDO.Ninja POST Settings", False, f"VDO.Ninja POST request failed: {str(e)}")

    def test_cleanfeed_settings(self):
        """Test Cleanfeed settings endpoints"""
        try:
            # Test GET cleanfeed settings
            response = requests.get(f"{BACKEND_URL}/cleanfeed-settings", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "cleanfeedGuestUrl" in data and "presenterInstructions" in data:
                    self.log_result(
                        "Cleanfeed GET Settings", 
                        True, 
                        "Cleanfeed settings retrieved successfully", 
                        data
                    )
                else:
                    self.log_result(
                        "Cleanfeed GET Settings", 
                        False, 
                        "Cleanfeed settings missing required fields", 
                        data
                    )
            else:
                self.log_result(
                    "Cleanfeed GET Settings", 
                    False, 
                    f"Cleanfeed GET failed with status {response.status_code}", 
                    response.text
                )
                
        except Exception as e:
            self.log_result("Cleanfeed GET Settings", False, f"Cleanfeed GET request failed: {str(e)}")

    def test_status_endpoints(self):
        """Test status check endpoints"""
        try:
            # Test GET status
            response = requests.get(f"{BACKEND_URL}/status", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                self.log_result(
                    "Status GET", 
                    True, 
                    f"Status endpoint working - Retrieved {len(data)} status checks", 
                    {"count": len(data)}
                )
            else:
                self.log_result(
                    "Status GET", 
                    False, 
                    f"Status GET failed with status {response.status_code}", 
                    response.text
                )
                
            # Test POST status
            test_status = {"client_name": "backend_test_client"}
            response = requests.post(
                f"{BACKEND_URL}/status", 
                json=test_status,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if "id" in data and "client_name" in data and "timestamp" in data:
                    self.log_result(
                        "Status POST", 
                        True, 
                        "Status creation successful", 
                        data
                    )
                else:
                    self.log_result(
                        "Status POST", 
                        False, 
                        "Status creation response missing fields", 
                        data
                    )
            else:
                self.log_result(
                    "Status POST", 
                    False, 
                    f"Status POST failed with status {response.status_code}", 
                    response.text
                )
                
        except Exception as e:
            self.log_result("Status Endpoints", False, f"Status endpoints request failed: {str(e)}")

    def test_error_handling(self):
        """Test error handling for invalid requests"""
        try:
            # Test invalid endpoint
            response = requests.get(f"{BACKEND_URL}/nonexistent", timeout=10)
            if response.status_code == 404:
                self.log_result(
                    "Error Handling - Invalid Endpoint", 
                    True, 
                    "Correctly returns 404 for invalid endpoint"
                )
            else:
                self.log_result(
                    "Error Handling - Invalid Endpoint", 
                    False, 
                    f"Expected 404, got {response.status_code}"
                )
                
            # Test invalid JSON for POST
            response = requests.post(
                f"{BACKEND_URL}/vdo-ninja-settings", 
                data="invalid json",
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            if response.status_code in [400, 422]:  # Bad request or validation error
                self.log_result(
                    "Error Handling - Invalid JSON", 
                    True, 
                    f"Correctly handles invalid JSON with status {response.status_code}"
                )
            else:
                self.log_result(
                    "Error Handling - Invalid JSON", 
                    False, 
                    f"Expected 400/422 for invalid JSON, got {response.status_code}"
                )
                
        except Exception as e:
            self.log_result("Error Handling", False, f"Error handling test failed: {str(e)}")

    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Vox Radio Backend API Tests")
        print(f"Testing backend at: {BACKEND_URL}")
        print("=" * 60)
        
        # Core API tests
        self.test_health_check()
        self.test_server_time()
        
        # VDO.Ninja integration tests
        current_vdo_settings = self.test_vdo_ninja_get_settings()
        self.test_vdo_ninja_post_settings(current_vdo_settings)
        
        # Other endpoint tests
        self.test_cleanfeed_settings()
        self.test_status_endpoints()
        
        # Error handling tests
        self.test_error_handling()
        
        # Summary
        print("=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        print(f"✅ Passed: {len(self.passed_tests)}")
        print(f"❌ Failed: {len(self.failed_tests)}")
        print(f"📈 Success Rate: {len(self.passed_tests)}/{len(self.results)} ({len(self.passed_tests)/len(self.results)*100:.1f}%)")
        
        if self.failed_tests:
            print("\n❌ FAILED TESTS:")
            for test in self.failed_tests:
                print(f"  - {test}")
                
        if self.passed_tests:
            print("\n✅ PASSED TESTS:")
            for test in self.passed_tests:
                print(f"  - {test}")
        
        return len(self.failed_tests) == 0

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)