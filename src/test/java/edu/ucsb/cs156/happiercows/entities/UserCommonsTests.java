package edu.ucsb.cs156.happiercows.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.Set;

import org.junit.jupiter.api.Test;

public class UserCommonsTests {
    @Test
    void getCowHerds_when_null() {
        UserCommons userCommons = UserCommons.builder().cowHerds(null).build();
        userCommons.setCowHerds(null);

        Set<CowHerd> cowHerds = userCommons.getCowHerds();

        assertNotNull(cowHerds);
        assertEquals(0, cowHerds.size());
    }

    @Test
    void getCowHerds_when_not_null() {
        CowHerd cowHerd = CowHerd.builder().numCows(5).build();
        UserCommons userCommons = new UserCommons();
        userCommons.getCowHerds().add(cowHerd);

        Set<CowHerd> cowHerds = userCommons.getCowHerds();

        assertNotNull(cowHerds);
        assertEquals(1, cowHerds.size());
        assertEquals(cowHerd, cowHerds.iterator().next());
    }
}
