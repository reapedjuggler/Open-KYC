package net.corda.samples.example.schema;

import net.corda.core.schemas.MappedSchema;
import net.corda.core.schemas.PersistentState;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Arrays;
import java.util.UUID;
//4.6 changes
import org.hibernate.annotations.Type;
import javax.annotation.Nullable;

/**
 * An IOUState schema.
 */
public class IOUSchemaV1 extends MappedSchema {
    public IOUSchemaV1() {
        super(IOUSchema.class, 1, Arrays.asList(PersistentIOU.class));
    }

    @Nullable
    @Override
    public String getMigrationResource() {
        return "iou.changelog-master";
    }

    @Entity
    @Table(name = "iou_states")
    public static class PersistentIOU extends PersistentState {
        @Column(name = "lender") private final String lender;
        @Column(name = "borrower") private final String borrower;
        @Column(name = "value") private final int value;
        @Column(name = "linear_id") @Type (type = "uuid-char") private final UUID linearId;
        @Column(name = "aadhar") private final String aadhar;
        @Column(name = "pan") private final String pan;
        @Column(name = "email") private final String email;
        @Column(name = "approval") private final String approval;
        @Column(name = "timestamp") private final String timestamp;
        public PersistentIOU(String lender, String borrower, int value, UUID linearId,  String aadhar, String pan, String email, String approval, String timestamp) {
            this.lender = lender;
            this.borrower = borrower;
            this.value = value;
            this.linearId = linearId;
            this.aadhar = aadhar;
            this.pan = pan;
            this.email = email;
            this.approval = approval;
            this.timestamp = timestamp;
        }

        // Default constructor required by hibernate.
        public PersistentIOU() {
            this.lender = null;
            this.borrower = null;
            this.value = 0;
            this.linearId = null;
            this.aadhar = null;
            this.pan = null;
            this.email = null;
            this.approval = null;
            this.timestamp = null;
        }

        public String getLender() {
            return lender;
        }

        public String getBorrower() {
            return borrower;
        }

        public int getValue() {
            return value;
        }

        public UUID getId() {
            return linearId;
        }

        public String getAadhar() {
            return aadhar;
        }
    }
}