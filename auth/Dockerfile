FROM openjdk:11-jdk as build

WORKDIR /build

ADD ./ /build/

RUN ./mvnw clean install -f /build/common/pom.xml
RUN ./mvnw clean install -f /build/auth/pom.xml

FROM openjdk:11-jdk

ARG JAR_FILE=*.jar
COPY --from=build /build/auth/target/${JAR_FILE} /usr/share/go-hiking/auth/auth.jar

ENTRYPOINT ["java", "-jar", "/usr/share/go-hiking/auth/auth.jar"]

EXPOSE 9010