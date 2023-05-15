package com.backend.backend.file;

import com.backend.backend.event.EventRepository;
import com.backend.backend.subject.Subject;
import com.backend.backend.subject.SubjectRepo;
import com.backend.backend.type.Type;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class FileService {
    @Autowired
    private FileRepository fileRepository;

    @Autowired
    private SubjectRepo subjectRepository;

    @Autowired
    private EventRepository eventRepository;

    public File getFile(Long id) {
        File file = fileRepository.getById(id);
        if (file == null) {
            // exception
        }
        return file;
    }

    public List<File> getFiles() {
        return fileRepository.findAll();
    }

    public List<File> getFilesBySubjectId(Long subjectId, String type) {
        List<File> files = new ArrayList<File>();
        switch (type.toLowerCase(Locale.ROOT)){
            case "excercise":
                files = fileRepository.findAllByFormat(Type.EXCERCISE);
                break;
            case "lecture":
                files = fileRepository.findAllByFormat(Type.LECTURE);
                break;
            case "tutorial":
                files = fileRepository.findAllByFormat(Type.TUTORIAL);
                break;
            case "student_excercise":
                files = fileRepository.findAllByFormat(Type.STUDENT_EXCERCISE);
                break;
        }
        return files
                .stream()
                .filter(file -> file.getSubject().getId() == subjectId)
                .collect(Collectors.toList());
    }

    public List<File> getFilesBySubjectName(String subjectName) {
        return fileRepository.findAll()
                .stream()
                .filter(file -> file.getSubject().getName().equals(subjectName))
                .collect(Collectors.toList());
    }


    // post
    public File addFile(File file, Long subjectId) {
        Subject subject = subjectRepository.getById(subjectId);
        if (file.getSubject() == null) {
            file.setSubject(subject);
        }

        File createdFile = fileRepository.save(file);
        //subject.addFile(createdFile);
        subjectRepository.save(subject); // ?

        return createdFile;
    }

    // delete

    public String deleteFile(Long id) {
        File file = fileRepository.getById(id);
        if (file != null) {
            fileRepository.deleteById(id);
            return "Sucesfully deleted file with id=" + id;
        }
        return "Can not find file with id=" + id;
    }

    public File saveFile(File eventFile, Long subjectId) {
        Subject subject = subjectRepository.findById(subjectId).get();
        eventFile.setSubject(subject);
        fileRepository.save(eventFile);
        return eventFile;
    }

    public File getEventFile(Long eventId) {
        return eventRepository.findById(eventId).get().getFile();
    }
}
