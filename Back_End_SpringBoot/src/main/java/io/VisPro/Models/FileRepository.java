package io.VisPro.Models;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
public interface FileRepository extends CrudRepository<File, Long>{
	File findByfilename(String filename);
	File findByUser(User user);
	File findByUserIsNull();
	Iterable<File> findAllByUser(User user);
}
