package com.backend.backend.file;

import com.backend.backend.type.Type;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.*;
import java.util.List;
import java.io.*;
import java.util.Locale;

@RestController
public class FileController {
    @Autowired
    private FileService fileService;

    //GET MAPPING
    @GetMapping("/file/byid/{id}")
    public ResponseEntity<File> getFile(@PathVariable Long id) {
        return new ResponseEntity<File>(fileService.getFile(id), HttpStatus.OK);
    }

    @GetMapping("/files")
    public ResponseEntity<List<File>> getFiles() {
        return new ResponseEntity<List<File>>(fileService.getFiles(), HttpStatus.OK);
    }

    @GetMapping("/files/bySubjectId/{subjectId}/{type}")
    public ResponseEntity<List<File>> getFilesBySubjectId(@PathVariable Long subjectId, @PathVariable String type) {
        return new ResponseEntity<List<File>>(fileService.getFilesBySubjectId(subjectId, type), HttpStatus.OK);
    }


    @GetMapping("/files/bysubjectname/{subjectName}")
    public ResponseEntity<List<File>> getFilesBySubjectName(@PathVariable String subjectName) {
        return new ResponseEntity<List<File>>(fileService.getFilesBySubjectName(subjectName), HttpStatus.OK);
    }

    //POST MAPPING
    @PostMapping("/addFile")
    public ResponseEntity<File> addFile(@RequestBody File file, Long subjectId) {
        return new ResponseEntity<File>(fileService.addFile(file, subjectId), HttpStatus.CREATED);
    }

    //PUT MAPPING

    //DELETE MAPPING
    @DeleteMapping("/deleteFile/{id}")
    public ResponseEntity<String> deleteFile(@PathVariable Long id) {
        return new ResponseEntity<String>(fileService.deleteFile(id),HttpStatus.OK);
    }

    @PostMapping("/upload")
    public ResponseEntity uploadToLocalFileSystem(@RequestParam("file") MultipartFile file, @RequestParam("subjectId") String subjectId, @RequestParam("type") String type) {
        String fileName = RandomStringUtils.randomAlphabetic(10) + "-" + StringUtils.cleanPath(file.getOriginalFilename());
        Path path = Paths.get(System.getProperty("user.dir") + "/files/" + fileName);

        try{
            Files.createDirectory(Paths.get(System.getProperty("user.dir") + "/files/"));
        } catch (IOException e){

        }

        try {
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
        }
        String filePath = System.getProperty("user.dir") + "/files/" + fileName;
        File eventFile = new File();
        eventFile.setName(fileName);
        switch (type.toLowerCase(Locale.ROOT)){
            case "excercise":
                eventFile.setFormat(Type.EXCERCISE);
                break;
            case "lecture":
                eventFile.setFormat(Type.LECTURE);
                break;
            case "tutorial":
                eventFile.setFormat(Type.TUTORIAL);
                break;
            case "student_excercise":
                eventFile.setFormat(Type.STUDENT_EXCERCISE);
                break;
        }
        eventFile.setValue(path.toString());
        eventFile = fileService.saveFile(eventFile, Long.parseLong(subjectId));
        return ResponseEntity.ok(eventFile);
    }

    @GetMapping("/download/{event}")
    public ResponseEntity downloadFileEvent(@PathVariable String event) {
        File file = fileService.getEventFile(Long.parseLong(event));

        Path path = Paths.get(System.getProperty("user.dir") + "/files/" + file.getName());
        Resource resource = null;
        try {
            resource = new UrlResource(path.toUri());
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @GetMapping("/download/file/{fileId}")
    public ResponseEntity downloadFile(@PathVariable String fileId) {
        File file = fileService.getFile(Long.parseLong(fileId));

        Path path = Paths.get(System.getProperty("user.dir") + "/files/" + file.getName());
        Resource resource = null;
        try {
            resource = new UrlResource(path.toUri());
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}
