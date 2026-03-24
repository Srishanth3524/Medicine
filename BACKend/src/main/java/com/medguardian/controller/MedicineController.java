
package com.medguardian.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medguardian.entity.Medicine;
import com.medguardian.service.MedicineService;

@RestController
@RequestMapping("/api/medicines")
@CrossOrigin
public class MedicineController {

 private final MedicineService service;

 public MedicineController(MedicineService service) {
  this.service = service;
 }

 @PostMapping
 public Medicine add(@RequestBody Medicine medicine){
  return service.addMedicine(medicine);
 }

 @GetMapping
 public List<Medicine> getAll(){
  return service.getAll();
 }

 @DeleteMapping("/{id}")
 public void delete(@PathVariable Long id){
  service.delete(id);
 }
}
