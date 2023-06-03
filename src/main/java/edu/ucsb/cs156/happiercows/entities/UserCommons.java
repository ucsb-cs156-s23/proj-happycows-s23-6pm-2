package edu.ucsb.cs156.happiercows.entities;

import java.util.HashSet;
import java.util.Set;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Builder;
import lombok.AccessLevel;


import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Entity(name = "user_commons")
public class UserCommons {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;  

  @Column(name="commons_id")
  private long commonsId;  

  @Column(name="user_id")
  private long userId;  

  private String username;

  private double totalWealth;

  @EqualsAndHashCode.Exclude
  @JsonManagedReference
  @Builder.Default
  @OneToMany(mappedBy = "userCommons", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  private Set<CowHerd> cowHerds = new HashSet<CowHerd>();

  public Set<CowHerd> getCowHerds() {
    // Required for backwards compatibility
    if (this.cowHerds == null) {
      this.cowHerds = new HashSet<>();
    }
    return this.cowHerds;
  }

  // TODO: Remove once `cowHerds` is fully implemented
  private int numOfCows;

  private double cowHealth;
}

