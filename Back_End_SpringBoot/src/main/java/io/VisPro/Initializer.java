/*
 * package io.VisPro;
 * 
 * import java.util.stream.Stream;
 * 
 * import org.springframework.boot.CommandLineRunner; import
 * org.springframework.stereotype.Component;
 * 
 * import io.VisPro.Models.User; import io.VisPro.Models.UserRepository;
 * 
 * @Component public class Initializer implements CommandLineRunner { private
 * final UserRepository repository;
 * 
 * @Override
 * 
 * public void run(String... args) throws Exception { Stream.of("Denver JUG",
 * "Utah JUG", "Seattle JUG", "Richmond JUG").forEach(name ->
 * repository.save(new User()) );
 * repository.findAll().forEach(System.out::println);
 * 
 * } public Initializer(UserRepository repository) { super(); this.repository =
 * repository; }
 * 
 * }
 */