class ApiCalls {
  async createVector(user_id, face_vector) {
    const url = 'http://localhost:3000/facial-vectors';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user_id,
          face_vector: face_vector,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error('Erro ao enviar vetor facial:', response.statusText);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  async getAllVectors() {
    const url = 'http://localhost:3000/facial-vectors';

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error('Erro:', response.statusText);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  async euclideanDistance(userVector) {
    const url = "http://localhost:3000/facial-vectors/calcular-distancia-euclidiana";

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userVector: userVector
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error('Erro:', response.statusText);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  }

  async createUser(name) {
    const url = 'http://localhost:3000/users';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error('Erro ao criar usuário:', response.statusText);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  async getUser(id) {
    const url = 'http://localhost:3000/users/' + id;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error('Erro:', response.statusText);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  async getAllUser() {
    const url = 'http://localhost:3000/users';

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error('Erro:', response.statusText);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };
}

export default ApiCalls;