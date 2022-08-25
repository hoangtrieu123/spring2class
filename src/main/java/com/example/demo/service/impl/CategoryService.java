package com.example.demo.service.impl;

import com.example.demo.repository.ICategoryRepository;
import com.example.demo.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class CategoryService implements ICategoryService {
    @Autowired
    public ICategoryRepository iCategoryRepository;
    @Override

    public Object save(Object o) {
        return null;
    }

    @Override
    public Optional findById(Long id) {
        return Optional.empty();
    }

    @Override
    public List findAll() {
        return iCategoryRepository.findAll();
    }

    @Override
    public void delete(Long id) {

    }
}
