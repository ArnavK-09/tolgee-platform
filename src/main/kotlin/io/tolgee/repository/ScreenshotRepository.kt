package io.tolgee.repository

import io.tolgee.model.Screenshot
import io.tolgee.model.key.Key
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ScreenshotRepository : JpaRepository<Screenshot, Long> {
    fun findAllByKey(key: Key, pageRequest: Pageable? = null): List<Screenshot>

    fun getAllByKeyRepositoryId(repositoryId: Long): List<Screenshot>
    fun getAllByKeyId(id: Long): List<Screenshot>
    fun getAllByKeyIdIn(keyIds: Collection<Long>): List<Screenshot>
}