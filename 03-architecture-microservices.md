# Module 3 : Architecture Micro-services

## 📚 Objectifs pédagogiques

À la fin de ce module, vous serez capable de :
- Comprendre les principes de l'architecture micro-services
- Différencier architecture monolithique vs micro-services
- Identifier les avantages et défis des micro-services
- Concevoir une architecture micro-services simple
- Implémenter la communication entre micro-services
- Gérer la sécurité et la surveillance dans une architecture distribuée

---

## 🎯 Introduction

L'architecture micro-services est un style d'architecture qui structure une application comme un ensemble de **services indépendants** communiquant via des APIs bien définies.

**Analogie** : Imaginez une grande entreprise :
- **Monolithe** = Tous les employés dans un seul bureau géant
- **Micro-services** = Départements spécialisés (RH, Finance, IT) dans des bureaux séparés qui collaborent

**Définition** : Les micro-services décomposent une application complexe en petits services métier autonomes, déployables indépendamment.

---

## 🏗️ Monolithe vs Micro-services

### Architecture Monolithique

```mermaid
graph TB
    U[Utilisateurs] --> LB[Load Balancer]
    LB --> M[Application Monolithique]
    M --> DB[(Base de données unique)]
    
    subgraph "Monolithe"
        M --> UI[Interface Utilisateur]
        M --> BL[Logique Métier]
        M --> DA[Accès aux données]
    end
    
    style M fill:#ffcccc
```

**Caractéristiques** :
- ✅ Simple à développer au début
- ✅ Facile à tester et déployer
- ❌ Devient complexe à grande échelle
- ❌ Technologie unique
- ❌ Déploiement en bloc

### Architecture Micro-services

```mermaid
graph TB
    U[Utilisateurs] --> AG[API Gateway]
    AG --> MS1[Service Utilisateurs]
    AG --> MS2[Service Commandes]
    AG --> MS3[Service Paiements]
    AG --> MS4[Service Notifications]
    
    MS1 --> DB1[(DB Users)]
    MS2 --> DB2[(DB Orders)]
    MS3 --> DB3[(DB Payments)]
    MS4 --> MQ[Message Queue]
    
    style MS1 fill:#e8f5e8
    style MS2 fill:#e8f5e8
    style MS3 fill:#e8f5e8
    style MS4 fill:#e8f5e8
```

**Caractéristiques** :
- ✅ Scalabilité indépendante
- ✅ Technologies diverses
- ✅ Équipes autonomes
- ❌ Complexité de communication
- ❌ Gestion distribuée

---

## 🔑 Principes fondamentaux

### 1. Responsabilité unique
Chaque service a une **responsabilité métier spécifique**.

### 2. Autonomie
Les services sont **développés, déployés et gérés indépendamment**.

### 3. Décentralisation
**Données et gouvernance** décentralisées par service.

### 4. Résistance aux pannes
**Conception défensive** face aux défaillances réseau.

### 5. Communication par APIs
**Interfaces contractuelles** bien définies.

---

## 🏛️ Patterns d'architecture

### API Gateway Pattern

```mermaid
graph LR
    C[Client Mobile] --> AG[API Gateway]
    W[Client Web] --> AG
    T[Client Tiers] --> AG
    
    AG --> |Route + Auth| MS1[User Service]
    AG --> |Route + Auth| MS2[Order Service]
    AG --> |Route + Auth| MS3[Payment Service]
    
    AG --> |Logs| MON[Monitoring]
    AG --> |Metrics| MON
```

**Responsabilités de l'API Gateway** :
- Routage des requêtes
- Authentification/Autorisation
- Limitation de débit (Rate limiting)
- Monitoring et logging
- Transformation des données

### Service Discovery Pattern

```mermaid
graph TB
    SR[Service Registry] --> |Register| MS1[Service A]
    SR --> |Register| MS2[Service B]
    SR --> |Register| MS3[Service C]
    
    MS1 --> |Discover| SR
    MS2 --> |Discover| SR
    MS3 --> |Discover| SR
    
    MS1 --> |Call| MS2
    MS2 --> |Call| MS3
```

### Circuit Breaker Pattern

```mermaid
stateDiagram-v2
    [*] --> Closed
    Closed --> Open : Failures > Threshold
    Open --> HalfOpen : Timeout
    HalfOpen --> Closed : Success
    HalfOpen --> Open : Failure
    
    note right of Closed
        Requêtes normales
    end note
    
    note right of Open
        Échec rapide
        Pas d'appels
    end note
    
    note right of HalfOpen
        Test de récupération
    end note
```

---

## 🚀 Communication entre services

### Communication Synchrone (REST APIs)

```javascript
// Service Commandes appelle Service Utilisateurs
class OrderService {
    async createOrder(userId, items) {
        try {
            // Vérifier l'utilisateur
            const user = await fetch(`http://user-service/users/${userId}`);
            if (!user.ok) throw new Error('User not found');
            
            // Créer la commande
            const order = {
                userId,
                items,
                createdAt: new Date()
            };
            
            return await this.saveOrder(order);
        } catch (error) {
            console.error('Order creation failed:', error);
            throw error;
        }
    }
}
```

### Communication Asynchrone (Messages)

```mermaid
sequenceDiagram
    participant OS as Order Service
    participant MQ as Message Queue
    participant PS as Payment Service
    participant NS as Notification Service
    
    OS->>MQ: ORDER_CREATED
    MQ->>PS: Process Payment
    MQ->>NS: Send Confirmation
    PS->>MQ: PAYMENT_PROCESSED
    MQ->>NS: Payment Success
    NS->>MQ: EMAIL_SENT
```

```javascript
// Publisher (Service Commandes)
const publishEvent = (eventType, data) => {
    messageQueue.publish('orders.events', {
        type: eventType,
        data,
        timestamp: new Date()
    });
};

// Subscriber (Service Notifications)
messageQueue.subscribe('orders.events', (message) => {
    if (message.type === 'ORDER_CREATED') {
        sendOrderConfirmation(message.data);
    }
});
```

---

## 🗄️ Gestion des données

### Database per Service

```mermaid
graph TB
    subgraph "User Service"
        US[User API] --> UDB[(Users DB)]
    end
    
    subgraph "Order Service"
        OS[Order API] --> ODB[(Orders DB)]
    end
    
    subgraph "Payment Service"
        PS[Payment API] --> PDB[(Payments DB)]
    end
    
    subgraph "Inventory Service"
        IS[Inventory API] --> IDB[(Inventory DB)]
    end
```

### Saga Pattern (Transactions distribuées)

```mermaid
sequenceDiagram
    participant Client
    participant OrderService
    participant PaymentService
    participant InventoryService
    
    Client->>OrderService: Create Order
    OrderService->>InventoryService: Reserve Items
    InventoryService-->>OrderService: Items Reserved
    OrderService->>PaymentService: Process Payment
    PaymentService-->>OrderService: Payment Failed
    OrderService->>InventoryService: Release Items (Compensate)
    OrderService-->>Client: Order Failed
```

---

## 🔒 Sécurité dans les micro-services

### Authentication & Authorization

```mermaid
graph LR
    C[Client] --> |1. Login| AUTH[Auth Service]
    AUTH --> |2. JWT Token| C
    C --> |3. Request + Token| AG[API Gateway]
    AG --> |4. Validate Token| AUTH
    AUTH --> |5. Claims| AG
    AG --> |6. Authorized Request| MS[Micro-service]
```

### Token-based Security (JWT)

```javascript
// Middleware d'authentification
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Utilisation
app.get('/api/orders', authenticateToken, getOrders);
```

---

## 📊 Monitoring et Observabilité

### Les trois piliers de l'observabilité

```mermaid
graph TB
    OBS[Observabilité] --> LOGS[Logs]
    OBS --> METRICS[Métriques]
    OBS --> TRACES[Traces distribuées]
    
    LOGS --> L1[Erreurs applicatives]
    LOGS --> L2[Événements métier]
    
    METRICS --> M1[Latence]
    METRICS --> M2[Throughput]
    METRICS --> M3[Taux d'erreur]
    
    TRACES --> T1[Suivi de requête]
    TRACES --> T2[Performance end-to-end]
```

### Exemple de logging structuré

```javascript
const logger = require('winston');

// Configuration du logger
const serviceLogger = logger.createLogger({
    level: 'info',
    format: logger.format.combine(
        logger.format.timestamp(),
        logger.format.json()
    ),
    defaultMeta: {
        service: 'order-service',
        version: '1.2.0'
    }
});

// Utilisation
serviceLogger.info('Order created', {
    orderId: '12345',
    userId: 'user-789',
    amount: 99.99,
    correlationId: req.headers['x-correlation-id']
});
```

---

## 🛠️ Outils et technologies

### Stack technologique typique

| Catégorie | Outils |
|-----------|--------|
| **Conteneurisation** | Docker, Kubernetes |
| **API Gateway** | Kong, AWS API Gateway, Zuul |
| **Service Mesh** | Istio, Linkerd, Consul Connect |
| **Base de données** | PostgreSQL, MongoDB, Redis |
| **Messaging** | RabbitMQ, Apache Kafka, AWS SQS |
| **Monitoring** | Prometheus, Grafana, ELK Stack |
| **Tracing** | Jaeger, Zipkin, AWS X-Ray |

---

## 📚 Ressources officielles

- [Microservices.io - Patterns](https://microservices.io/patterns/)
- [Martin Fowler on Microservices](https://martinfowler.com/articles/microservices.html)
- [12-Factor App Methodology](https://12factor.net/)
- [API Design Guidelines](https://github.com/microsoft/api-guidelines)
- [Kubernetes Documentation](https://kubernetes.io/docs/)

---

## 🎯 Exercices pratiques

### Exercice 1 : Conception d'architecture
**Contexte** : Système de e-commerce
1. Identifiez 5 domaines métier (services)
2. Définissez les responsabilités de chaque service
3. Dessinez l'architecture avec les communications
4. Identifiez les données de chaque service

### Exercice 2 : API REST pour micro-service
1. Créez un service "Products" avec Express.js
2. Implémentez les endpoints CRUD
3. Ajoutez la validation des données
4. Documentez l'API avec Swagger

### Exercice 3 : Communication entre services
1. Créez un service "Orders" 
2. Faites-le communiquer avec le service "Products"
3. Implémentez la gestion d'erreur
4. Ajoutez des logs structurés

### Exercice 4 : Messaging asynchrone
1. Configurez RabbitMQ avec Docker
2. Créez un publisher dans le service Orders
3. Créez un consumer dans un service Notifications
4. Testez l'envoi d'événements

---

## ✅ Points clés à retenir

- **Décomposition métier** : Un service = une responsabilité
- **Indépendance** : Services autonomes en développement et déploiement
- **Communication** : APIs REST + messaging asynchrone
- **Données** : Une base par service
- **Observabilité** : Logs, métriques, traces indispensables
- **Sécurité** : Authentification centralisée, autorisation distribuée

---

## ⚠️ Défis et considérations

1. **Complexité** : Plus difficile à déboguer
2. **Réseau** : Latence, partitions, indisponibilité
3. **Données** : Consistance éventuelle
4. **Tests** : Tests d'intégration complexes
5. **Déploiement** : Coordination des versions
6. **Monitoring** : Observabilité distribuée

---

*Prochaine étape : Module 4 - Workflow Intégré (CI/CD + Orchestration)* 