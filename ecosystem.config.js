module.exports = {
    apps: [
        {
          name: "cloud-sql-auth-proxy",
          script: "./cloud-sql-proxy project-eaa010ce-98d6-49ee-ab7:asia-southeast1:mysql-eca-db-01 --private-ip",
          log_file: "./logs/cloud-sql-proxy.log",
        },
        {
            name: "iam-service",
            script: "java -jar iam-service/target/iam-service-1.0.0.jar",
            log_file: "./logs/customer-management-service.log",
            instances: 2,

        },
        {
            name: "product-service",
            script: "java -jar product-service/target/product-service-1.0.0.jar",
            log_file: "./logs/product-catalog-service.log",
            instances: 2,

        },
        {
            name: "order-service",
            script: "java -jar order-service/target/Order-Service-1.0.0.jar",
            log_file: "./logs/order-service.log",
            instances: 2,

        }
    ]
}
