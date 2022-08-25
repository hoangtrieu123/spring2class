package com.example.demo.service.impl;

import com.example.demo.model.Product;
import com.example.demo.repository.IProductRepository;
import com.example.demo.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService implements IProductService {
    @Autowired
    public IProductRepository iProductRepository;

    @Override
    public Product save(Product product) {
        return iProductRepository.save(product);
    }

    @Override
    public Optional<Product> findById(Long id) {
        return iProductRepository.findById(id);
    }

    @Override
    public List<Product> findAll() {
        return iProductRepository.findAll();
    }

    @Override
    public void delete(Long id) {
        iProductRepository.deleteById(id);
    }
}
