const API_BASE_URL = 'https://hamzaa982-skincare-chatbot.hf.space'; 

class ChatbotAPI {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.sessionId = this.generateSessionId();
  }

  // Generate a unique session ID for the user
  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Send a message to the chatbot and get response
  async sendMessage(message, userName = null) {
    try {
      const response = await fetch(`${this.baseURL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          session_id: this.sessionId,
          user_name: userName
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data
      };
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
      return {
        success: false,
        error: error.message,
        data: null
      };
    }
  }

  // Check if the backend is healthy/available
  async checkHealth() {
    try {
      const response = await fetch(`${this.baseURL}/health`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return {
        success: true,
        data: data
      };
    } catch (error) {
      console.error('Error checking backend health:', error);
      return {
        success: false,
        error: error.message,
        data: null
      };
    }
  }

  // Get the root endpoint info
  async getRootInfo() {
    try {
      const response = await fetch(`${this.baseURL}/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return {
        success: true,
        data: data
      };
    } catch (error) {
      console.error('Error getting root info:', error);
      return {
        success: false,
        error: error.message,
        data: null
      };
    }
  }

  // Update the session ID (useful for new conversations)
  updateSessionId() {
    this.sessionId = this.generateSessionId();
  }

  // Get current session ID
  getSessionId() {
    return this.sessionId;
  }

  // Set a custom session ID
  setSessionId(sessionId) {
    this.sessionId = sessionId;
  }
}

// Create and export a singleton instance
const chatbotAPI = new ChatbotAPI();

export default chatbotAPI; 