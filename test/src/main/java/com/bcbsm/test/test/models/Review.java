package com.bcbsm.test.test.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name="review")
@Data
@Builder
@AllArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String comment;
    private Integer ratingValue;
    private Date createdDate;
    @ManyToOne( cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name="user_id")
    @JsonIgnore
    private User user;
    @PrePersist
    public void prePersist(){
        if(this.createdDate==null){
        this.createdDate=new Date();}
    }
    public Review(){

    }

}
