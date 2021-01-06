package io.VisPro.Controllers;

import java.io.IOException;

import org.apache.jasper.tagplugins.jstl.core.Set;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.common.io.Files;

import io.VisPro.Dao.FileDao;
import io.VisPro.Models.File;
import io.VisPro.Models.FileRepository;
import io.VisPro.Models.User;
import io.VisPro.Models.UserRepository;

@CrossOrigin("*")
@RestController
public class FileController {

    private static final Logger logger = LoggerFactory.getLogger(FileController.class);
    public static File currentFile;
    public static File lastFile;
    @Autowired
    private FileDao fileDao;
    @Autowired
    private UserRepository userRepository;
    @PostMapping(value = "/catchFile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadFile(@RequestParam MultipartFile file) throws IOException {
        logger.info(String.format("File name '%s' uploaded successfully.", file.getOriginalFilename()));
        if(UserController.currentUserId!=-1) {
        	User userBuffer = userRepository.findById(UserController.currentUserId).get();
            currentFile = fileDao.save(new File(file.getOriginalFilename(), file.getBytes(),userBuffer));
        }else {
            currentFile = fileDao.save(new File(file.getOriginalFilename(), file.getBytes()));
        }
        return ResponseEntity.ok().body("FileUploaded");
    }
    @PostMapping(value = "/deleteFile")
    public ResponseEntity<String> deleteFile(@RequestParam long fileId) throws IOException {
    	File filetodelete=fileDao.findById(fileId);
    	fileDao.delete(filetodelete);
        logger.info(String.format("File name '%s' removed successfully.", filetodelete.getFilename()));
       
        return ResponseEntity.ok().body("FileRemoved");
    }
    @GetMapping("/getUserFiles")
    public ResponseEntity<Iterable<File>> getUserFiles(){
    	System.out.println(UserController.currentUserId);
    	Iterable<File> userFiles = fileDao.findAllByUser(userRepository.findById(UserController.currentUserId).get());
    	return ResponseEntity.ok().body(userFiles);
    }

}